import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #7866eaff 0%, #764ba2 100%)',
      backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      fontFamily: '"Poppins", sans-serif',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      opacity: 0.98
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '3rem',
        textAlign: 'center',
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
        maxWidth: '500px',
        width: '100%'
      }}>
        <h1 style={{
          fontSize: '3em',
          fontWeight: 'bold',
          marginBottom: '1rem',
          color: '#ddd',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          opacity: 0.9
        }}>
          SafeDrive Certify
        </h1>
        <p style={{
          fontSize: '1.2em',
          marginBottom: '2rem',
          color: '#e0e0e0',
          opacity: 0.8
        }}>
          Promoting safe and professional taxi behavior in Johannesburg
        </p>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <button style={{
              width: '100%',
              padding: '1rem',
              border: 'none',
              borderRadius: '8px',
              background: 'linear-gradient(90deg, #00CC66, #009944)',
              color: '#fff',
              fontSize: '1.1em',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, opacity 0.2s ease',
              boxShadow: '0 4px 15px rgba(0, 204, 102, 0.3)',
              opacity: 0.3
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Login
            </button>
          </Link>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <button style={{
              width: '100%',
              padding: '1rem',
              border: 'none',
              borderRadius: '8px',
              background: 'linear-gradient(90deg, #FF6B6B, #EE5A24)',
              color: '#fff',
              fontSize: '1.1em',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, opacity 0.2s ease',
              boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
              opacity: 0.3
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Register
            </button>
          </Link>
        </div>
        <p style={{
          color: '#e0e0e0',
          fontSize: '0.9em'
        }}>
          Not a member?{' '}
          <Link to="/register" style={{
            color: '#a8c0ff',
            textDecoration: 'none',
            fontWeight: '500'
          }}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Home;
