var express = require('express');
var sanitizeHtml = require('sanitize-html');
var router = express.Router();
const Post = require('../Post');

const POST_HTML_ALLOWED_TAGS = ['p', 'br', 'b', 'i', 'em', 'strong', 'a' ]

/* GET post listings */
router.get('/', async(req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({message: err.message })
  }
});

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

router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id)

    if (!post) res.status(404).send("No post found")
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err)
  }
})

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

/* GET single post */
router.get('/:slug', async(req, res) => {
  try {
    const post = await Post.findOne({slug: req.params.slug});
    res.json(post);
  } catch (err) {
    res.status(500).json({message: err.message })
  }
});


module.exports = router;
