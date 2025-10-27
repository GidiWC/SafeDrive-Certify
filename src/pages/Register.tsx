import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'driver' | 'passenger' | 'association'>('passenger');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
      dispatch(login({
        user: { id: user.uid, name, email: user.email!, role },
        token: await user.getIdToken()
      }));
      // Redirect based on role
      if (role === 'driver') {
        navigate('/driver');
      } else if (role === 'association') {
        navigate('/association');
      } else {
        navigate('/passenger');
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      fontFamily: '"Poppins", sans-serif',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      opacity: 0.89
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
        <h2 style={{
          fontSize: '2.5em',
          fontWeight: 'bold',
          marginBottom: '1.5rem',
          color: '#ddd',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          opacity: 0.9
        }}>
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#e0e0e0',
              fontWeight: '500'
            }}>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: 'none',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.2)',
                color: '#fff',
                fontSize: '1rem',
                outline: 'none',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
              }}
              placeholder="Enter your name"
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#e0e0e0',
              fontWeight: '500'
            }}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: 'none',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.2)',
                color: '#fff',
                fontSize: '1rem',
                outline: 'none',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
              }}
              placeholder="Enter your email"
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#e0e0e0',
              fontWeight: '500'
            }}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: 'none',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.2)',
                color: '#fff',
                fontSize: '1rem',
                outline: 'none',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
              }}
              placeholder="Enter your password"
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#e0e0e0',
              fontWeight: '500'
            }}>Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as 'driver' | 'passenger' | 'association')}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: 'none',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.2)',
                color: '#fff',
                fontSize: '1rem',
                outline: 'none',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
              }}
            >
              <option value="passenger">Passenger</option>
              <option value="driver">Driver</option>
              <option value="association">Association</option>
            </select>
          </div>
          {error && <p style={{
            color: '#ff6b6b',
            marginBottom: '1rem',
            fontWeight: '500'
          }}>{error}</p>}
          <button type="submit" style={{
            width: '100%',
            padding: '1rem',
            border: 'none',
            borderRadius: '8px',
            background: 'linear-gradient(90deg, #FF6B6B, #EE5A24)',
            color: '#fff',
            fontSize: '1.1em',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
            boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
            marginBottom: '1.5rem'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Register
          </button>
        </form>
        <p style={{
          color: '#e0e0e0',
          fontSize: '0.9em'
        }}>
          Already have an account?{' '}
          <Link to="/login" style={{
            color: '#a8c0ff',
            textDecoration: 'none',
            fontWeight: '500'
          }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
