// src/components/NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <Link to="/">blogs</Link> &nbsp;
      <Link to="/users">users</Link>
    </nav>
  );
};

export default NavBar;
