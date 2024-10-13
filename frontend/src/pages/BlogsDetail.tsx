import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogDetails } from '../utils/api';

interface Blog {
  _id: string;
  title: string;
  content: string;
  image: string;
}

const BlogDetails: React.FC = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      const res = await getBlogDetails(blogId!);
      setBlog(res.data);
    };
    fetchBlogDetails();
  }, [blogId]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <img src={blog.image} alt={blog.title} className="w-full h-auto" />
      <p>{blog.content}</p>
    </div>
  );
};

export default BlogDetails;
