import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token'); // Check if token exists

  const handleLogin = () => {
    navigate('/signin');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate('/blogs');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      {!isLoggedIn ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome to the Blog App</h1>
          <p className="mb-4">Please sign up or log in to continue.</p>
          <button className="bg-blue-500 rounded-md text-white px-4 py-2 mr-2" onClick={handleLogin}>
            Log In
          </button>
          <button className="bg-green-500 rounded-md text-white px-4 py-2" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
