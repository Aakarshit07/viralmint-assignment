import React, { useEffect, useState } from 'react';
import { getBlogs } from '../utils/api';
import { useNavigate } from 'react-router-dom';

interface Blog {
  _id: string;
  title: string;
  content: string;
  image: string;
}

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const navigate =  useNavigate();
  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await getBlogs();
      setBlogs(res.data);
    };
    fetchBlogs();
  }, []);

  const handleCreateBlog = ( ) => {
    navigate('/blogs/create')
  }

  return (
    <div className="container mx-auto p-4">
      <div className='bg-neutral-100 rounded-lg p-2 shadow-md w-full flex items-center justify-between gap-10'>
        <h1 className="text-3xl font-bold">Blogs</h1>
        <button className='bg-blue-500 rounded-md text-white px-4 py-2'
        onClick={handleCreateBlog}>Create Blog</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white p-4 shadow-md rounded">
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <p>{blog.content.substring(0, 100)}...</p>
            <a href={`/blogs/${blog._id}`} className="text-blue-500">Read More</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
