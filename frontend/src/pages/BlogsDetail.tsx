import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlogDetails, deleteBlog } from '../utils/api';

interface Blog {
  _id: string;
  title: string;
  content: string;
  image: string;
}

const BlogDetails: React.FC = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      const res = await getBlogDetails(blogId!);
      console.log(blogId)
      setBlog(res.data);
    };
    fetchBlogDetails();
  }, [blogId]);

  if (!blog) return <p>Loading...</p>;

  const handleDeleteBlog = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      await deleteBlog(blog._id);
      navigate('/blogs');
    }
  };

  const handleEditBlog = () => {
    navigate(`/blogs/edit/${blog._id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <img src={blog.image} alt={blog.title} className="w-full h-auto rounded-lg shadow-lg" />
      <p className='shadow-lg rounded-lg bg-neutral-50 mt-8 p-4'>{blog.content}</p>
      <div className="mt-8 flex gap-4 rounded-lg bg-neutral-50 p-4">
        <button className='border-2 border-red-500 rounded-md px-4 py-2' onClick={handleDeleteBlog}>
          🗑️ Delete Blog
        </button>
        <button className='border-2 border-blue-500 rounded-md px-4 py-2' onClick={handleEditBlog}>
          ✏️ Edit Blog
        </button>
      </div>
    </div>
  );
};

export default BlogDetails;
