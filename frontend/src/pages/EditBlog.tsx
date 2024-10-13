import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlogDetails, updateBlog } from '../utils/api';

interface BlogData {
  title: string;
  content: string;
  image?: string;
}

const EditBlog: React.FC = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const [blogData, setBlogData] = useState<BlogData>({ title: '', content: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      const res = await getBlogDetails(blogId!);
      setBlogData(res.data);
    };
    fetchBlogDetails();
  }, [blogId]);

  const handleUpdateBlog = async () => {
    await updateBlog(blogId!, blogData);
    navigate(`/blogs/${blogId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Edit Blog</h1>
      <input
        type="text"
        value={blogData.title}
        onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
        className="block w-full p-2 border border-gray-300 rounded mb-4"
      />
      <textarea
        value={blogData.content}
        onChange={(e) => setBlogData({ ...blogData, content: e.target.value })}
        className="block w-full p-2 border border-gray-300 rounded mb-4"
      />
      <button onClick={handleUpdateBlog} className="bg-blue-500 text-white p-2 rounded">
        Update Blog
      </button>
    </div>
  );
};

export default EditBlog;
