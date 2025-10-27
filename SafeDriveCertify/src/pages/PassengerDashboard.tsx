import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { Link } from 'react-router-dom';

const PassengerDashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Passenger Dashboard</h2>
      {user && (
        <div>
          <p>Welcome, {user.name}!</p>
          <p>Role: {user.role}</p>
        </div>
      )}
      <div style={{ marginTop: '2rem' }}>
        <h3>Rate Your Last Trip</h3>
        <p>Help improve safety by rating drivers.</p>
        <Link to="/passenger/rate">
          <button style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}>Rate Driver</button>
        </Link>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <h3>Report an Incident</h3>
        <p>Saw unsafe behavior? Report it anonymously.</p>
        <Link to="/report">
          <button style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}>Report Incident</button>
        </Link>
      </div>
    </div>
  );
};

export default PassengerDashboard;
