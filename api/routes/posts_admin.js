var express = require('express');
var sanitizeHtml = require('sanitize-html');
var router = express.Router();
const {Post, PostBlock} = require('../src/Post');

const POST_HTML_ALLOWED_TAGS = ['p', 'br', 'b', 'i', 'em', 'strong', 'a' ]

/**
 * POST create post
 */
router.post('/', async(req, res) => {
  const body = {
    title: req.body.title,
    intro: sanitizeHtml(req.body.intro, {
      allowedTags: POST_HTML_ALLOWED_TAGS})
  }
  const post = new Post(body);

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * DELETE post and related blocks
 */
router.delete('/:id', async (req, res) => {
  try {
    const blocks = await PostBlock.deleteMany({
      post: req.params.id
    })
    const post = await Post.findByIdAndDelete(req.params.id)

    if (!post) res.status(404).send("No post found")
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err)
  }
})

/**
 * PATCH update post
 */
router.patch('/:id', async (req, res) => {
  try {
    const body = {
      title: req.body.title,
      intro: sanitizeHtml(req.body.intro, {
        allowedTags: POST_HTML_ALLOWED_TAGS})
    }
    const post = await Post.findByIdAndUpdate(req.params.id, body)
    res.status(200).send(post)
  } catch (err) {
    res.status(500).send(err)
  }
})

/**
 * POST Create block on post.
 *
 * @param {String} postId id of the post object
 */
router.post('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)

    const body = {
      sort_order: req.body.sort_order,
      text: sanitizeHtml(req.body.text, {
        allowedTags: POST_HTML_ALLOWED_TAGS}),
      post: post._id
    }
    const postBlock = new PostBlock(body);
    const newBlock = await postBlock.save();

    post.blocks.push(newBlock._id);
    post.save();
    res.status(201).json(newBlock);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

/**
 * DELETE block on post.
 *
 * @param {String} postId id of the post object
 * @param {String} id id of the block object
 */
router.delete('/:postId/:id', async (req, res) => {
  try {
    const post = await PostBlock.findOneAndDelete({
      _id: req.params.id,
      post: req.params.postId
    })

    if (!post) res.status(404).send("No block found")
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err)
  }
})

/**
 * PATCH update post
 * @param {String} postId id of the post object
 * @param {String} id id of the block object
 */
router.patch('/:postId/:id', async (req, res) => {
  try {
    const body = {
      sort_order: req.body.sort_order,
      text: sanitizeHtml(req.body.text, {
        allowedTags: POST_HTML_ALLOWED_TAGS})
    }
    const block = await PostBlock.findOneAndUpdate({
      _id: req.params.id,
      post: req.params.postId}, body)
    res.status(200).send(block)
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router;
