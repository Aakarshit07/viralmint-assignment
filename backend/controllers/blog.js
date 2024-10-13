const Blog = require('../models/Blog');
const User = require('../models/User');

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'name username');
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blogs', error: err });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId).populate('author', 'name username');
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blog', error: err });
  }
};

exports.createBlog = async (req, res) => {
  const { title, image, content, subheading, labels, location } = req.body;
  try {
    const user = await User.findById(req.user.id);
    // if (!user.isPaymentVerified) return res.status(400).json({ message: 'Payment not verified' });

    const newBlog = new Blog({
      title,
      image,
      content,
      subheading,
      labels,
      author: user._id,
      location,
    });

    await newBlog.save();
    res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
  } catch (err) {
    res.status(500).json({ message: 'Error creating blog', error: err });
  }
};


// Update (Edit) blog
exports.updateBlog = async (req, res) => {
  const { blogId } = req.params;
  const { title, image, content, subheading, labels, location } = req.body;

  try {
    const blog = await Blog.findById(blogId);

    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    blog.title = title || blog.title;
    blog.image = image || blog.image;
    blog.content = content || blog.content;
    blog.subheading = subheading || blog.subheading;
    blog.labels = labels || blog.labels;
    blog.location = location || blog.location;

    await blog.save();
    res.json({ message: 'Blog updated successfully', blog });
  } catch (err) {
    res.status(500).json({ message: 'Error updating blog', error: err });
  }
};

// Delete blog
exports.deleteBlog = async (req, res) => {
  const { blogId } = req.params;

  try {
    const blog = await Blog.findById(blogId);

    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await blog.remove();
    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting blog', error: err });
  }
};