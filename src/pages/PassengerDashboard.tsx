import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const PassengerDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

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
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      {user && (
        <div style={{ marginBottom: '2rem' }}>
          <h1>Welcome, {user.name}</h1>
          <p>{user.email}</p>
        </div>
      )}
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
        <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', flex: 1 }}>
          <h3>Total Rides</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>0</p>
          <p>Rides completed</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', flex: 1 }}>
          <h3>Ratings Given</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>0</p>
          <p>Operators rated</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', flex: 1 }}>
          <h3>Incidents Reported</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>0</p>
          <p>Total reports</p>
        </div>
      </div>
      <div style={{ marginBottom: '2rem' }}>
        <h3>Join Ride Session</h3>
        <p>Scan or enter a QR code to join an active ride</p>
        <button style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}>Scan QR Code</button>
        <button style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}>Enter Session Code</button>
      </div>
      <div style={{ marginBottom: '2rem' }}>
        <h3>Report Incident</h3>
        <p>Report safety concerns or conflicts anonymously</p>
        <Link to="/report">
          <button style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}>File Incident Report</button>
        </Link>
      </div>
      <div style={{ marginBottom: '2rem' }}>
        <h3>Recent Rides</h3>
        <p>Your ride history and ratings</p>
        <p>No ride history yet. Join a session to get started!</p>
      </div>

    </div>
  );
};

export default PassengerDashboard;
