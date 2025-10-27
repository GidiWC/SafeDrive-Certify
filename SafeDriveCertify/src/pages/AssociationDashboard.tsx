import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

const AssociationDashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { drivers } = useSelector((state: RootState) => state.driver);
  const { reports } = useSelector((state: RootState) => state.report);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Association Dashboard</h2>
      {user && (
        <div>
          <p>Welcome, {user.name}!</p>
          <p>Role: {user.role}</p>
        </div>
      )}
      <div style={{ marginTop: '2rem' }}>
        <h3>Driver Overview</h3>
        <p>Total Drivers: {drivers.length}</p>
        <p>Certified Drivers: {drivers.filter(d => d.isCertified).length}</p>
        <ul>
          {drivers.slice(0, 5).map(driver => (
            <li key={driver.id}>
              {driver.name} - Rating: {driver.rating} - Incidents: {driver.incidents}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <h3>Recent Reports</h3>
        <p>Total Reports: {reports.length}</p>
        <ul>
          {reports.slice(0, 5).map(report => (
            <li key={report.id}>
              Location: {report.location.lat}, {report.location.lng} - Verified: {report.verified ? 'Yes' : 'No'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AssociationDashboard;
