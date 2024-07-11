// src/App.jsx
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom';
import blogService from './services/blogs';
import loginService from './services/login';
import storage from './services/storage';
import Login from './components/Login';
import Notification from './components/Notification';
import NewBlog from './components/NewBlog';
import UserList from './components/UserList';
import User from './components/User';
import BlogList from './components/BlogList';
import Blog from './components/Blog';
import NavBar from './components/NavBar';

const App = () => {
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const user = storage.loadUser();
    setUser(user);
  }, []);

  const notifyWith = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification('');
    }, 5000);
  };

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      storage.saveUser(user);
      notifyWith(`Welcome ${user.name}!`);
    } catch (error) {
      notifyWith('wrong username/password', 'error');
    }
  };

  const logout = () => {
    setUser(null);
    storage.removeUser();
    notifyWith('Logged out');
  };

  const createBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog);
      notifyWith(`A new blog '${newBlog.title}' by ${newBlog.author} added!`);
    } catch (error) {
      notifyWith('Error creating blog', 'error');
    }
  };

  return (
    <Router>
      <div>
        <NavBar /> {/* Add NavBar */}
        <h1>blog app</h1>
        <Notification notification={notification} />
        {user === null ? (
          <Login onLogin={login} />
        ) : (
          <div>
            <p>{user.name} logged in <button onClick={logout}>logout</button></p>
            <NewBlog createBlog={createBlog} />
          </div>
        )}
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<Blog />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
