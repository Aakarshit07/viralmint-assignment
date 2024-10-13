import axios from 'axios';

const API_URL = '/api'; // This will be proxied to your backend
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
  image?: string; // Optional image field
}

// Authentication APIs
export const signup = (userData: AuthData) => api.post('/auth/signup', {...userData, name: "hello"});
export const signin = (userData: AuthData) => api.post('/auth/signin', userData);

// Blog APIs
export const getBlogs = () => api.get('/blogs');
export const getBlogDetails = (blogId: string) => api.get(`/blogs/${blogId}`);
export const createBlog = (blogData: BlogData) => api.post('/blogs', blogData);
