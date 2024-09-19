
const express = require('express');
const { createPost, fetchPost, updatePost, fetchSinglePost, deletePost } = require('../controllers/postController');


const router = express.Router();

router.post('/', createPost);

// Fetch all post
router.get('/', fetchPost)

// Update post
router.put('/:id', updatePost)

// Fetch single post
router.get('/:id', fetchSinglePost)

// Delete post
router.delete('/:id', deletePost)


module.exports = router;
