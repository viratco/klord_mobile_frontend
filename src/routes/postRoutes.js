
const express = require('express');
const { createPost, fetchPost, updatePost, fetchSinglePost, deletePost, fetchSinglePostWithSolution } = require('../controllers/postController');


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

// Fetch post with solution
router.get('/post-solution/:id', fetchSinglePostWithSolution)


module.exports = router;
