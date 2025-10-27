import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const DriverDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const { currentDriver } = useSelector((state: RootState) => state.driver);

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
          <h3>Certification Status</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'green' }}>Active</p>
          <p>Valid until Dec 2025</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', flex: 1 }}>
          <h3>Rating</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>4.8 / 5.0</p>
          <p>Based on 156 rides</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', flex: 1 }}>
          <h3>Active Sessions</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>0</p>
          <p>No active ride sessions</p>
        </div>
      </div>
      <div style={{ marginBottom: '2rem' }}>
        <h3>Start Ride Session</h3>
        <p>Create a QR code for passengers to join your ride</p>
        <button style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}>Generate Session QR Code</button>
      </div>
      <div style={{ marginBottom: '2rem' }}>
        <h3>My Certification</h3>
        <p>View and manage your operator certification</p>
        <Link to="/certification">
          <button style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}>View Certification Details</button>
        </Link>
      </div>
      <div style={{ marginBottom: '2rem' }}>
        <h3>Recent Ride History</h3>
        <p>Your last completed rides</p>
        <p>No ride history yet. Start a session to get started!</p>
      </div>

    </div>
  );
};

export default DriverDashboard;
