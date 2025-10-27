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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      fontFamily: '"Poppins", sans-serif',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      opacity: 0.85
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '3rem',
        textAlign: 'center',
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
        maxWidth: '600px',
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
          Report an Incident
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#e0e0e0',
              fontSize: '1.1em',
              fontWeight: '500'
            }}>
              Description:
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                minHeight: '120px',
                resize: 'vertical'
              }}
              placeholder="Describe the incident..."
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              color: '#e0e0e0',
              fontSize: '1rem',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
                style={{
                  marginRight: '0.5rem',
                  transform: 'scale(1.2)'
                }}
              />
              Submit anonymously
            </label>
          </div>
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
            marginBottom: '1rem'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportIncident;
