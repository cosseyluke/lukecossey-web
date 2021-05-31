const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  first_name: {
    type: String,
    required: false
  },
  last_name: {
    type: String,
    required: false
  },
  created: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', function(next) {
  // Check if document is new or a new password has been set
  if (this.isNew || this.isModified('password')) {
    // Saving reference to this because of changing scopes
    const document = this;
    bcrypt.hash(document.password, saltRounds,
      function(err, hashedPassword) {
      if (err) {
        next(err);
      }
      else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

userSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    return {
      id: ret._id,
      email: ret.email,
      first_name: ret.first_name,
      last_name: ret.last_name,
      created: ret.created,
    }
  }
});

userSchema.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.password, function(err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
}

module.exports.User = mongoose.model('User', userSchema);
