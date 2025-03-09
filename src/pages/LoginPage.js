import React from "react";
import "../styles/LoginPage.css"; // Ensure this CSS file exists in the styles folder

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="left-side">
        <h1>Welcome</h1>
        <h2>LABMate</h2>
        <p>Manage all your labs in one place.</p>
        <div className="image-container">
          {/* Replace the image name with the correct one from your public/images folder */}
          <img
            src="/images/3.png" // Replace with your actual image name
            alt="Illustration"
            className="login-image"
          />
        </div>
      </div>
      <div className="right-side">
        <div className="login-form">
          <div className="role-selector">
            <button>Student</button>
            <button>Lecturer</button>
            <button>Technical Officer</button>
            <button>Admin</button>
          </div>
          <h3>Login</h3>
          <form>
            <input
              type="text"
              placeholder="Username"
              className="login-input"
            />
            <input
              type="password"
              placeholder="Password"
              className="login-input"
            />
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          <button className="login-microsoft">
            <span>Log in with Microsoft</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
