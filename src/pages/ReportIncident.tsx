import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReport } from '../store/slices/reportSlice';

const ReportIncident: React.FC = () => {
  const [description, setDescription] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReport = {
      id: Date.now().toString(),
      location: { lat: -26.2041, lng: 28.0473 }, // Mock Johannesburg location
      description,
      photos: [], // Mock empty photos
      anonymous,
      verified: false,
      timestamp: new Date().toISOString(),
    };
    dispatch(addReport(newReport));
    alert('Report submitted successfully!');
    setDescription('');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Report an Incident</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', minHeight: '100px' }}
            placeholder="Describe the incident..."
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            <input
              type="checkbox"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
            />
            Submit anonymously
          </label>
        </div>
        <button type="submit" style={{ width: '100%', padding: '0.5rem' }}>
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default ReportIncident;
