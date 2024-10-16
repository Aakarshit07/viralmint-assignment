const express = require('express');
const { getBlogs, getBlogById, createBlog, deleteBlog, updateBlog } = require('../controllers/blog.js');
const { verifyToken } = require('../middlewares/authMiddleware.js');
const router = express.Router();

// Blog Routes
router.get('/', getBlogs);
router.get('/:blogId', getBlogById);
router.post('/', verifyToken, createBlog);
router.delete('/:blogId', verifyToken, deleteBlog); 
router.put('/:blogId', verifyToken, updateBlog);

module.exports = router;
