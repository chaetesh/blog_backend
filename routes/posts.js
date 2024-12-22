const express = require("express");
const Post = require("../models/post");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

// Create new blog post (Admin only)
router.post("/", authenticate, async (req, res) => {
  const { title, content, imageUrl } = req.body;
  const post = new Post({ title, content, imageUrl });
  await post.save();
  res.send({ message: "Post created", post });
});

// Edit blog post (Admin only)
router.put("/:id", authenticate, async (req, res) => {
  const { title, content, imageUrl } = req.body;
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { title, content, imageUrl },
    { new: true }
  );
  res.send({ message: "Post updated", post });
});

// Delete blog post (Admin only)
router.delete("/:id", authenticate, async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.send({ message: "Post deleted" });
});

// View all posts
router.get("/", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.send(posts);
});

// Like a post
router.post("/:id/like", async (req, res) => {
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { $inc: { likes: 1 } },
    { new: true }
  );
  res.send({ message: "Post liked", post });
});

module.exports = router;
