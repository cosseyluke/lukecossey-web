const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

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
    slug: "title"
  },
  intro: {
    type: String,
    default: '',
    required: false
  }
})

const postBlockSchema = new mongoose.Schema({
  post: postSchema,
  sort_order: {
    type: Number,
    default: 0,
    required: true
  },
  text: {
    type: String,
    default: '',
    required: false,
  }
})

// block_type = models.CharField(max_length=8, choices=TYPE_CHOICES,
//                                   db_index=True)
// parent = models.ForeignKey(
//     Post, related_name='blocks', on_delete=models.CASCADE)
//
// class Meta:
//     ordering = ('sort_order', 'id')
//
// def __str__(self):
//     return '%s on %s' % (self.get_block_type_display(),
//                          str(self.parent))

module.exports = mongoose.model('Post', postSchema);
