import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>SafeDrive Certify</h1>
      <p>Promoting safe and professional taxi behavior in Johannesburg</p>
      <div>
        <Link to="/login">
          <button style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}>Login</button>
        </Link>
        <Link to="/register">
          <button style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}>Register</button>
        </Link>
      </div>

    </div>
  );
};

export default Home;
