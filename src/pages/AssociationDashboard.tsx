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

  const handleViewAllOperators = () => {
    navigate('/certification');
  };

  const handleViewPendingReports = () => {
    navigate('/report');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      fontFamily: '"Poppins", sans-serif',
      padding: '2rem',
      opacity: 0.85
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '3rem',
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: '2.5em',
          fontWeight: 'bold',
          marginBottom: '1.5rem',
          color: '#ddd',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          opacity: 0.9,
          textAlign: 'center'
        }}>
          Association Dashboard
        </h1>
        {user && (
          <div style={{
            marginBottom: '2rem',
            textAlign: 'center',
            color: '#e0e0e0',
            fontSize: '1.1em'
          }}>
            <p>{user.email}</p>
          </div>
        )}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            textAlign: 'center',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{
              color: '#e0e0e0',
              marginBottom: '0.5rem',
              fontSize: '1.2em'
            }}>
              Total Operators
            </h3>
            <p style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#fff',
              marginBottom: '0.5rem'
            }}>
              0
            </p>
            <p style={{
              color: '#b0b0b0',
              fontSize: '0.9em'
            }}>
              Registered operators
            </p>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            textAlign: 'center',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{
              color: '#e0e0e0',
              marginBottom: '0.5rem',
              fontSize: '1.2em'
            }}>
              Active Certifications
            </h3>
            <p style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#fff',
              marginBottom: '0.5rem'
            }}>
              0
            </p>
            <p style={{
              color: '#b0b0b0',
              fontSize: '0.9em'
            }}>
              Currently valid
            </p>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            textAlign: 'center',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{
              color: '#e0e0e0',
              marginBottom: '0.5rem',
              fontSize: '1.2em'
            }}>
              Pending Incidents
            </h3>
            <p style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#fff',
              marginBottom: '0.5rem'
            }}>
              0
            </p>
            <p style={{
              color: '#b0b0b0',
              fontSize: '0.9em'
            }}>
              Awaiting review
            </p>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            textAlign: 'center',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{
              color: '#e0e0e0',
              marginBottom: '0.5rem',
              fontSize: '1.2em'
            }}>
              Avg. Rating
            </h3>
            <p style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#fff',
              marginBottom: '0.5rem'
            }}>
              N/A
            </p>
            <p style={{
              color: '#b0b0b0',
              fontSize: '0.9em'
            }}>
              Overall performance
            </p>
          </div>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{
              color: '#e0e0e0',
              marginBottom: '0.5rem',
              fontSize: '1.3em'
            }}>
              Operator Management
            </h3>
            <p style={{
              color: '#b0b0b0',
              marginBottom: '1rem',
              fontSize: '0.95em'
            }}>
              View and manage all registered operators
            </p>
            <button
              style={{
                width: '100%',
                padding: '0.75rem',
                border: 'none',
                borderRadius: '8px',
                background: 'linear-gradient(90deg, #FF6B6B, #EE5A24)',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
                boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              onClick={handleViewAllOperators}
            >
              View All Operators
            </button>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{
              color: '#e0e0e0',
              marginBottom: '0.5rem',
              fontSize: '1.3em'
            }}>
              Incident Reports
            </h3>
            <p style={{
              color: '#b0b0b0',
              marginBottom: '1rem',
              fontSize: '0.95em'
            }}>
              Review and manage incident reports
            </p>
            <button
              style={{
                width: '100%',
                padding: '0.75rem',
                border: 'none',
                borderRadius: '8px',
                background: 'linear-gradient(90deg, #FF6B6B, #EE5A24)',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
                boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              onClick={handleViewPendingReports}
            >
              View Pending Reports
            </button>
          </div>
        </div>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{
            color: '#e0e0e0',
            marginBottom: '0.5rem',
            fontSize: '1.3em'
          }}>
            Recent Activity
          </h3>
          <p style={{
            color: '#b0b0b0',
            marginBottom: '1rem',
            fontSize: '0.95em'
          }}>
            Latest operator registrations and incidents
          </p>
          <p style={{
            color: '#888',
            fontStyle: 'italic',
            fontSize: '0.9em'
          }}>
            No activity yet. Data will appear as operators register and use the system.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssociationDashboard;
