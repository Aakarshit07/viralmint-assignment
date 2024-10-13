import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../utils/api'; // Import signup from api.ts
import axios from 'axios';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', password: '', location: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const { data } = await axios.get('https://ipapi.co/json/'); 
        setFormData((prev) => ({ ...prev, location: data.country || 'Unknown' })); 
      } catch (error) {
        setErrorMessage('Unable to fetch location.');
        console.error(error);
      }
    };
    fetchLocation();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signup(formData);
      localStorage.setItem('token', response.data.token); 
      navigate('/blogs'); 
    } catch (error) {
      setErrorMessage('Signup failed. Please try again.');
      console.error(error); // Log the error for debugging
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <input
          className="border p-2 mb-4 w-full"
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <input
          className="border p-2 mb-4 w-full"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Sign Up
        </button>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default SignUp;
