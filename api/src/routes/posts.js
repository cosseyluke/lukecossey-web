var express = require('express');
var sanitizeHtml = require('sanitize-html');

const { withAuth } = require('../middleware');
const { parseQueryFilter, parseQuerySort, POST_HTML_ALLOWED_TAGS, slugQuery } = require('./utils');

const {SeoPage} = require('../models/seo');
const {Post} = require('../models/posts');

var router = express.Router();

/**
 * GET post listings public
 */
router.get('/list', async(req, res) => {
  const ALLOWED_SORT = ['pub_date'];
  const sort = parseQuerySort({_sort: 'pub_date', _order: 'DESC'}, ALLOWED_SORT);

  try {
    const posts = await Post.find().sort(sort);
    res.header('X-Total-Count', posts.length);
    res.json(posts);
  } catch (err) {
    res.status(500).json({message: err.message })
  }
});

/**
 * GET post listings
 */
router.get('/', async(req, res) => {
  const ALLOWED_FILTER = {'id': '_id'};
  const ALLOWED_SORT = ['id', 'pub_date', 'title'];
  const query = req.query;

  const filter = parseQueryFilter(query, ALLOWED_FILTER);
  const sort = parseQuerySort(query, ALLOWED_SORT);

  try {
    const posts = await Post.find(filter).sort(sort);
    res.header('X-Total-Count', posts.length);
    res.json(posts);
  } catch (err) {
    res.status(500).json({message: err.message })
  }
});

/**
 * POST create post
 */
router.post('/', withAuth, async(req, res) => {
  const body = {
    title: req.body.title
  }
  const seoBody = {}

  if (req.body.intro !== undefined) body.intro = sanitizeHtml(
    req.body.intro, {allowedTags: POST_HTML_ALLOWED_TAGS}) || ''
  if (req.body.pub_date !== undefined) body.pub_date = req.body.pub_date
  if (req.body.slug !== undefined) body.slug = req.body.slug

  if (req.body.seo) {
    if (req.body.seo.title !== undefined) seoBody.title = req.body.seo.title
    if (req.body.seo.description !== undefined) seoBody.description = req.body.seo.description
  }

  const seoPage = new SeoPage(seoBody);

  try {
    newSeoPage = await seoPage.save();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }

  body.seo = newSeoPage;
  const post = new Post(body);

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * GET post
 *
 * @param {String} slug slug or id of the post object
 */
router.get('/:slug', async(req, res) => {
  try {
    const post = await Post.findOne(slugQuery(req.params.slug)).populate(
      'blocks');
    res.json(post);
  } catch (err) {
    res.status(500).json({message: err.message })
  }
});

/**
 * PUT update post
 */
router.put('/:id', withAuth, async (req, res) => {
  try {
    const body = {}

    if (req.body.title !== undefined) body.title = req.body.title
    if (req.body.slug !== undefined) body.slug = req.body.slug
    if (req.body.pub_date !== undefined) body.pub_date = req.body.pub_date
    if (req.body.intro !== undefined) body.intro = sanitizeHtml(
      req.body.intro, {allowedTags: POST_HTML_ALLOWED_TAGS}) || ''

    if (req.body.seo) {
      if (req.body.seo.title !== undefined) body['seo.title'] = req.body.seo.title
      if (req.body.seo.description !== undefined) body['seo.description'] = req.body.seo.description
    }

    const post = await Post.findByIdAndUpdate(req.params.id, body)
    res.status(200).send(post)
  } catch (err) {
    res.status(500).send(err)
  }
});

module.exports = router;
