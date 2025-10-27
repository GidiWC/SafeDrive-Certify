import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { Link } from 'react-router-dom';

const DriverDashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { currentDriver } = useSelector((state: RootState) => state.driver);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Driver Dashboard</h2>
      {user && (
        <div>
          <p>Welcome, {user.name}!</p>
          <p>Role: {user.role}</p>
        </div>
      )}
      {currentDriver && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Your Stats</h3>
          <p>Rating: {currentDriver.rating}/5</p>
          <p>Trips: {currentDriver.trips}</p>
          <p>Incidents: {currentDriver.incidents}</p>
          <p>Certified: {currentDriver.isCertified ? 'Yes' : 'No'}</p>
        </div>
      )}
      <div style={{ marginTop: '2rem' }}>
        <Link to="/certification">
          <button style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}>Get Certified</button>
        </Link>
        <Link to="/rewards">
          <button style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}>View Rewards</button>
        </Link>
      </div>
    </div>
  );
};

export default DriverDashboard;
