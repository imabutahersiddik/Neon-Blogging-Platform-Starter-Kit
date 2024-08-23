const express = require('express');
const { createPost, getAllPosts, updatePost, deletePost } = require('../controllers/postController');
const { authenticate } = require('../middlewares/authMiddleware'); // Middleware to authenticate users
const router = express.Router();

router.post('/', authenticate, createPost);
router.get('/', getAllPosts);
router.put('/:id', authenticate, updatePost);
router.delete('/:id', authenticate, deletePost);

module.exports = router;
