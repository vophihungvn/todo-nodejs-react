const mongoose = require('./base');

const User = mongoose.model('user', {
  title: String,
  finish: {
    type: Boolean,
    default: false
  }
});

module.exports = User;
