const mongoose = require('./base');

const User = mongoose.model('user', {
  username: String,
  password: String
})

module.exports = User