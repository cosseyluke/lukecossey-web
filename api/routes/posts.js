var express = require('express');
var sanitizeHtml = require('sanitize-html');

const {Post} = require('../src/Post');
const { parseQueryFilter, parseQuerySort, POST_HTML_ALLOWED_TAGS } = require('./utils');

var router = express.Router();

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
router.post('/', async(req, res) => {
  const body = {
    title: req.body.title
  }

  if (req.body.intro !== undefined) body.intro = sanitizeHtml(
    req.body.intro, {allowedTags: POST_HTML_ALLOWED_TAGS}) || ''
  if (req.body.pub_date !== undefined) body.pub_date = req.body.pub_date
  if (req.body.slug !== undefined) body.slug = req.body.slug

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
 * @param {String} id id of the post object
 */
router.get('/:id', async(req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (err) {
    res.status(500).json({message: err.message })
  }
});

/**
 * PATCH update post
 */
router.patch('/:id', async (req, res) => {
  try {
    const body = {}

    if (req.body.title !== undefined) body.title = req.body.title
    if (req.body.slug !== undefined) body.slug = req.body.slug
    if (req.body.pub_date !== undefined) body.pub_date = req.body.pub_date
    if (req.body.intro !== undefined) body.intro = sanitizeHtml(
      req.body.intro, {allowedTags: POST_HTML_ALLOWED_TAGS}) || ''

    const post = await Post.findByIdAndUpdate(req.params.id, body)
    res.status(200).send(post)
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router;
