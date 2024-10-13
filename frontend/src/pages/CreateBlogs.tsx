import React, { useState } from 'react';
import { createBlog, BlogData } from '../utils/api';

const CreateBlog: React.FC = () => {
  const [formData, setFormData] = useState<BlogData>({ title: '', content: '', image: '' });
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await createBlog(formData);
      console.log('Blog created:', res.data);
    } catch (err) {
      console.error('Error creating blog:', err);
      setErrorMessage('Blog creation failed.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Create Blog</h2>
        <input
          className="border p-2 mb-4 w-full"
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <textarea
          className="border p-2 mb-4 w-full"
          placeholder="Content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        />
        <input
          className="border p-2 mb-4 w-full"
          type="text"
          placeholder="Image URL"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Create</button>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default CreateBlog;
