// src/components/Header/Header.js
import React from 'react';
import './Header.css';

function Header() {
  return (
    <div className="header">
      <div className="header-content">
        <h1>Welcome back, Admin!</h1>
        <p>Control everything in one place</p>
      </div>
      <div className="header-image">
        {/* Replace with your image */}
        <img src="https://via.placeholder.com/150" alt="Admin" />
      </div>
    </div>
  );
}

export default Header;
