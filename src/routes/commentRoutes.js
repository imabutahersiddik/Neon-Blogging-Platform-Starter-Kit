const express = require('express');
const { createComment, getComments, deleteComment } = require('../controllers/commentController');
const { authenticate } = require('../middlewares/authMiddleware'); // Middleware to authenticate users
const router = express.Router();

router.post('/', authenticate, createComment);
router.get('/:postId', getComments);
router.delete('/:id', authenticate, deleteComment);

module.exports = router;
