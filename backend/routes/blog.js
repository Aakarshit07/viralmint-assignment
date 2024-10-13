const express = require('express');
const { getBlogs, getBlogById, createBlog } = require('../controllers/blog.js');
const { verifyToken } = require('../middlewares/authMiddleware.js');
const router = express.Router();

// Blog Routes
router.get('/', getBlogs);
router.get('/:blogId', getBlogById);
router.post('/', createBlog);

module.exports = router;
