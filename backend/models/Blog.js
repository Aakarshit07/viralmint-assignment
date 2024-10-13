const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String },
  content: { type: String, required: true },
  subheading: { type: String },
  labels: [{ type: String }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: { type: String, required: true },
});

module.exports = mongoose.model('Blog', blogSchema);
