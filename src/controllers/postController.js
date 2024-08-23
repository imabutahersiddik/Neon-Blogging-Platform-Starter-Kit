const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  const { title, content, tags } = req.body;
  const authorId = req.user.id; // Assuming user ID is available in req.user
  try {
    const post = new Post(null, title, content, authorId, tags);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.getAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, tags } = req.body;
  try {
    await Post.update(id, title, content, tags);
    res.status(200).json({ message: 'Post updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post' });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await Post.delete(id);
    res.status(200).json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
};
