import axios from 'axios';

const API_URL = 'https://viralmint-assignment.onrender.com/api';
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Type definitions for requests and responses
export interface AuthData {
  username: string;
  password: string;
  location?: string;
  name?: string;
}

export interface BlogData {
  title: string;
  content: string;
  image?: string;
  subheading?: string;
  labels?: string[];
  location?: string;
}

// Authentication APIs
export const signup = (userData: AuthData) => api.post('/auth/signup', {...userData, name: "DAN-DA-DAN"});
export const signin = (userData: AuthData) => api.post('/auth/signin', userData);
export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/';
};


// Blog APIs
export const getBlogs = () => api.get('/blogs');
export const getBlogDetails = (blogId: string) => api.get(`/blogs/${blogId}`);

export const createBlog = (blogData: BlogData) => {
  const token = localStorage.getItem('token');
  return api.post('/blogs', blogData, {
    headers: {
      Authorization: `${token}`,
    },
  });
};

export const updateBlog = (blogId: string, blogData: BlogData) => {
  const token = localStorage.getItem('token');
  return api.put(`/blogs/${blogId}`, blogData, {
    headers: {
      Authorization: `${token}`,
    },
  });
};

export const deleteBlog = (blogId: string) => {
  const token = localStorage.getItem('token');
  return api.delete(`/blogs/${blogId}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
};