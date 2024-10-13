import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signin, AuthData } from '../utils/api';

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState<AuthData>({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await signin(formData);
      localStorage.setItem('token', res.data.token); // Save token
      navigate('/blogs'); // Redirect to blog list
    } catch (err) {
      console.error('Error during sign-in:', err);
      setErrorMessage('Sign-in failed.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
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
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Sign In</button>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default SignIn;
