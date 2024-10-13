import React, { useState } from 'react';
import { createBlog, BlogData } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const CreateBlog: React.FC = () => {
  const [formData, setFormData] = useState<BlogData>({
    title: '',
    content: '',
    image: '',
    subheading: '',
    labels: [],
    location: ''
  });
  const [errorMessage, setErrorMessage] = useState<string>('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Make the API call to create the blog
      const res = await createBlog(formData);
      console.log('Blog created:', res.data);
      navigate('/blogs');
      setFormData({ 
        title: '',
        content: '',
        image: '',
        subheading: '',
        labels: [],
        location: ''
      });
    } catch (err: any) {
      console.error('Error creating blog:', err);
      const errorMsg = err.response?.data?.message || 'Blog creation failed.';
      setErrorMessage(errorMsg);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Create Blog</h2>
        
        {/* Title input */}
        <input
          className="border p-2 mb-4 w-full"
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        
        {/* Subheading input */}
        <input
          className="border p-2 mb-4 w-full"
          type="text"
          placeholder="Subheading"
          value={formData.subheading}
          onChange={(e) => setFormData({ ...formData, subheading: e.target.value })}
        />

        {/* Content textarea */}
        <textarea
          className="border p-2 mb-4 w-full"
          placeholder="Content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        />

        {/* Image URL input */}
        <input
          className="border p-2 mb-4 w-full"
          type="text"
          placeholder="Image URL"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        />

        {/* Labels input */}
        <input
          className="border p-2 mb-4 w-full"
          type="text"
          placeholder="Labels (comma-separated)"
          value={formData.labels && formData.labels.join(', ')}
          onChange={(e) => setFormData({ ...formData, labels: e.target.value.split(',').map(label => label.trim()) })}
        />

        {/* Location input */}
        <input
          className="border p-2 mb-4 w-full"
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        />

        {/* Submit button */}
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Create</button>

        {/* Error message */}
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default CreateBlog;
