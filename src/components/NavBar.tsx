import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { logout } from '../store/slices/authSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const NavBar: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0', marginBottom: '2rem' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
      {!user ? (
        <>
          <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <button onClick={handleSignOut} style={{ backgroundColor: '#f44336', color: 'white', border: 'none', padding: '0.5rem', cursor: 'pointer' }}>Sign Out</button>
      )}
    </nav>
  );
};

export default NavBar;
