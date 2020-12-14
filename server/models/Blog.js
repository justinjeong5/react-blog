const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  content: {
    type: String,
  }
})

const Blog = mongoose.model('Blog', userSchema)

module.exports = { Blog }