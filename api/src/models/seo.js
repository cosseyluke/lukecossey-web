const mongoose = require('mongoose');

const seoPageSchema = new mongoose.Schema({
  title: {
    type: String,
    default: '',
    required: false
  },
  description: {
    type: String,
    default: '',
    required: false
  }
})

seoPageSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    return {
      id: ret._id,
      title: ret.title,
      description: ret.description
    }
  }
})

module.exports.seoPageSchema = seoPageSchema;
module.exports.SeoPage = mongoose.model('SeoPage', seoPageSchema);
