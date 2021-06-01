const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const postBlockSchema = new mongoose.Schema({
  sort_order: {
    type: Number,
    default: 0,
    required: true
  },
  body: {
    type: String,
    default: '',
    required: false,
  },
  post_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'}
})

postBlockSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    return {
      id: ret._id,
      post_id: ret.post_id,
      sort_order: ret.sort_order,
      body: ret.body
    }
  }
})

module.exports.PostBlock = mongoose.model('PostBlock', postBlockSchema);


const postSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  is_live: {
    type: Boolean,
    default: false,
  },
  pub_date: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true,
    slug: "title",
    permanent: true
  },
  intro: {
    type: String,
    default: '',
    required: false
  },
  blocks: [
    {type: mongoose.Schema.Types.ObjectId, ref: 'PostBlock'}
  ]
})

postSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    return {
      id: ret._id,
      pub_date: ret.pub_date,
      title: ret.title,
      slug: ret.slug,
      intro: ret.intro,
      blocks: ret.blocks,
    }
  }
})

module.exports.Post = mongoose.model('Post', postSchema);
