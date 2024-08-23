const Comment = require('../models/Comment');

exports.createComment = async (req, res) => {
  const { postId, content } = req.body;
  const authorId = req.user.id; // Assuming user ID is available in req.user
  const comment = new Comment(null, postId, content, authorId);
  try {
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create comment' });
  }
};

exports.getComments = async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await Comment.findByPostId(postId);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

exports.deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    await Comment.delete(id);
    res.status(200).json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};
