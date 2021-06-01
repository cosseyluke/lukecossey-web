var express = require('express');
var sanitizeHtml = require('sanitize-html');
var router = express.Router();

const { withAuth } = require('../middleware');
const { parseQueryFilter, parseQuerySort, POST_HTML_ALLOWED_TAGS } = require('./utils');

const {Post, PostBlock} = require('../models/posts');

/**
 * GET block listings
 */
router.get('/', async(req, res) => {
  const ALLOWED_FILTER = {'id': '_id', 'post_id': 'post_id'};
  const ALLOWED_SORT = ['id', 'sort_order'];
  const query = req.query;

  const filter = parseQueryFilter(query, ALLOWED_FILTER);
  const sort = parseQuerySort(query, ALLOWED_SORT);

  try {
    const blocks = await PostBlock.find(filter).sort(sort);
    res.header('X-Total-Count', blocks.length);
    res.json(blocks);
  } catch (err) {
    res.status(500).json({message: err.message })
  }
});

/**
 * POST create block
 */
router.post('/', withAuth, async(req, res) => {
  const body = {}

  if (req.body.post_id !== undefined) body.post_id = req.body.post_id
  if (req.body.sort_order !== undefined) body.sort_order = req.body.sort_order
  if (req.body.body !== undefined) body.body = sanitizeHtml(
    req.body.body, {allowedTags: POST_HTML_ALLOWED_TAGS}) || '';

  const block = new PostBlock(body);

  try {
    const newBlock = await block.save();
    res.status(201).json(newBlock);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * GET block
 *
 * @param {String} id id of the block object
 */
router.get('/:id', async(req, res) => {
  try {
    const block = await PostBlock.findById(req.params.id);

    res.json(block);
  } catch (err) {
    res.status(500).json({message: err.message })
  }
});

/**
 * PUT update block
 */
router.put('/:id', withAuth, async (req, res) => {
  try {
    const body = {}

    if (req.body.post_id !== undefined) body.post_id = req.body.post_id
    if (req.body.sort_order !== undefined) body.sort_order = req.body.sort_order
    if (req.body.body !== undefined) body.body = sanitizeHtml(
      req.body.body, {allowedTags: POST_HTML_ALLOWED_TAGS}) || '';

    const block = await PostBlock.findByIdAndUpdate(req.params.id, body)
    res.status(200).send(block)
  } catch (err) {
    res.status(500).send(err)
  }
});

/**
 * DELETE block
 *
 * @param {String} id id of the block object
 */
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const block = await PostBlock.findOneAndDelete({
      _id: req.params.id
    })

    if (!block) res.status(404).send("No block found")
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err)
  }
});


module.exports = router;
