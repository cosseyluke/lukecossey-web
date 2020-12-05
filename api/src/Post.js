const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const Entities = require('html-entities').AllHtmlEntities
mongoose.plugin(slug);

const postBlockSchema = new mongoose.Schema({
  sort_order: {
    type: Number,
    default: 0,
    required: true
  },
  text: {
    type: String,
    default: '',
    required: false,
  },
  post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'}
})

module.exports.PostBlock = mongoose.model('PostBlock', postBlockSchema);


const postSchema = new mongoose.Schema({
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
    slugOn: { update: false }
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
    const entities = new Entities()

    return {
      _id: ret._id,
      pub_date: ret.pub_date,
      title: ret.title,
      slug: ret.slug,
      intro: entities.encode(ret.intro),
      blocks: ret.blocks,
    }
  }
})

module.exports.Post = mongoose.model('Post', postSchema);
