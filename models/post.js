const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
});

module.exports = mongoose.model("Post", postSchema);
