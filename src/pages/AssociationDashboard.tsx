import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const AssociationDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const { drivers } = useSelector((state: RootState) => state.driver);
  const { reports } = useSelector((state: RootState) => state.report);

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
      <h1>Association Dashboard</h1>
      {user && (
        <div style={{ marginBottom: '2rem' }}>
          <p>{user.email}</p>
        </div>
      )}
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
        <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', flex: 1 }}>
          <h3>Total Operators</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>0</p>
          <p>Registered operators</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', flex: 1 }}>
          <h3>Active Certifications</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>0</p>
          <p>Currently valid</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', flex: 1 }}>
          <h3>Pending Incidents</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>0</p>
          <p>Awaiting review</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', flex: 1 }}>
          <h3>Avg. Rating</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>N/A</p>
          <p>Overall performance</p>
        </div>
      </div>
      <div style={{ marginBottom: '2rem' }}>
        <h3>Operator Management</h3>
        <p>View and manage all registered operators</p>
        <button style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}>View All Operators</button>
      </div>
      <div style={{ marginBottom: '2rem' }}>
        <h3>Incident Reports</h3>
        <p>Review and manage incident reports</p>
        <button style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}>View Pending Reports</button>
      </div>
      <div style={{ marginBottom: '2rem' }}>
        <h3>Recent Activity</h3>
        <p>Latest operator registrations and incidents</p>
        <p>No activity yet. Data will appear as operators register and use the system.</p>
      </div>

    </div>
  );
};

export default AssociationDashboard;
