var express = require('express');
var router = express.Router();
const {Post} = require('../Post');

/**
 * GET post listings
 */
router.get('/', async(req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({message: err.message })
  }
});

/**
 * GET single post listing
 *
 * @param {String} slug slug of the post object
 */
router.get('/:slug', async(req, res) => {
  try {
    const post = await Post.findOne({slug: req.params.slug}).populate(
      'blocks');
    res.json(post);
  } catch (err) {
    res.status(500).json({message: err.message })
  }
});

module.exports = router;
