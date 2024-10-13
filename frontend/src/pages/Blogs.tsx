import React, { useEffect, useState } from 'react';
import { getBlogs, logout } from '../utils/api';
import { useNavigate } from 'react-router-dom';

interface Blog {
  _id: string;
  title: string;
  content: string;
  image: string;
  location: string; // Assuming each blog has a location property
}

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>(''); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await getBlogs();
      console.log(res);
      setBlogs(res.data);
      setFilteredBlogs(res.data); 
    };
    fetchBlogs();
  }, []);

  const handleCreateBlog = () => {
    navigate('/blogs/create');
  };

  const handleLogout = () => {
    logout();
  };

  const handleBlogDetails = (id: string) => {
    navigate(`/blogs/${id}`);
  };

  const handleLocationFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const location = event.target.value;
    setSelectedLocation(location);

    if (location) {
      const filtered = blogs.filter((blog) => blog.location.toLowerCase() === location.toLowerCase());
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs(blogs);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className='bg-neutral-100 rounded-lg p-2 shadow-md w-full flex items-center justify-between gap-10'>
        <h1 className="text-3xl font-bold">Blogs</h1>
        <button 
          className='bg-blue-500 rounded-md text-white px-4 py-2'
          onClick={handleCreateBlog}
        >
          Create Blog
        </button>
        <button 
          className='bg-rose-500 rounded-md text-white px-4 py-2'
          onClick={handleLogout}
        >
          Logout
        </button>
        <select
          value={selectedLocation}
          onChange={handleLocationFilterChange}
          className='border rounded-md p-2'
        >
          <option value="">All Locations</option>
          <option value="usa">USA</option>
          <option value="india">INDIA</option>
          <option value="europe">EUROPE</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 bg-neutral-100 rounded-lg p-4 shadow-neutral-300 ">
        {filteredBlogs.map((blog) => (
          <div key={blog._id} className="bg-white p-4 shadow-md rounded">
            {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-auto mb-2 rounded"
              />
            )}
            <h2 className="text-xl font-bold">{blog.title} | {blog.location}</h2>
            <p>{blog.content.substring(0, 100)}...</p>
            <button 
              className='bg-transparent text-blue-600 hover:text-blue-400 rounded-md p-2'
              onClick={() => handleBlogDetails(blog._id)}>
              Read More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
