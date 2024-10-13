import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
import SignUp from './pages/Signup';
import SignIn from './pages/Signin';
import ProtectedRoute from './components/PrivateRoute';
import BlogList from './pages/Blogs';
import CreateBlog from './pages/CreateBlogs';
import EditBlog from './pages/EditBlog';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blogs/:blogId" element={<BlogList />} />
          <Route path="/blogs/create" element={<CreateBlog />} />
          <Route path="/blogs/edit/:blogId" element={<EditBlog />} /> 
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
