import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1>SafeDrive Certify</h1>
      <p>Promoting safe and professional taxi behavior in Johannesburg</p>
      <div className="button-group">
        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>
        <Link to="/register" className="register-link">
          Register
        </Link>
      </div>
      <p className="signup-link">
        Not a member? <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
};

export default Home;
