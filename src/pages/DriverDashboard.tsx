import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import QRCode from 'qrcode';

const DriverDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const { currentDriver } = useSelector((state: RootState) => state.driver);
  const [sessionCode, setSessionCode] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleGenerateQR = async () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setSessionCode(code);

    try {
      const qrDataUrl = await QRCode.toDataURL(code, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrCodeUrl(qrDataUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
      alert(`Session code generated: ${code}\nQR code generation failed.`);
    }
  };

  const handleViewCertification = () => {
    navigate('/certification');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
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
        {user && (
          <div style={{
            marginBottom: '2rem',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
          }}>
            <h1 style={{
              fontSize: '2.5em',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
              color: '#fff',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              Welcome, {user.name}
            </h1>
            <p style={{
              color: '#e0e0e0',
              fontSize: '1.1em'
            }}>
              {user.email}
            </p>
          </div>
        )}
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
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{
              color: '#e0e0e0',
              marginBottom: '1rem',
              fontSize: '1.5em'
            }}>
              Certification Status
            </h3>
            <p style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#4CAF50',
              marginBottom: '0.5rem'
            }}>
              Active
            </p>
            <p style={{
              color: '#b0b0b0',
              fontSize: '1rem'
            }}>
              Valid until Dec 2025
            </p>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{
              color: '#e0e0e0',
              marginBottom: '1rem',
              fontSize: '1.5em'
            }}>
              Rating
            </h3>
            <p style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#FFD700',
              marginBottom: '0.5rem'
            }}>
              4.8 / 5.0
            </p>
            <p style={{
              color: '#b0b0b0',
              fontSize: '1rem'
            }}>
              Based on 156 rides
            </p>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{
              color: '#e0e0e0',
              marginBottom: '1rem',
              fontSize: '1.5em'
            }}>
              Active Sessions
            </h3>
            <p style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#FF6B6B',
              marginBottom: '0.5rem'
            }}>
              {sessionCode ? '1' : '0'}
            </p>
            <p style={{
              color: '#b0b0b0',
              fontSize: '1rem'
            }}>
              {sessionCode ? `Session: ${sessionCode}` : 'No active ride sessions'}
            </p>
          </div>
        </div>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          marginBottom: '2rem',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{
            color: '#e0e0e0',
            marginBottom: '0.5rem',
            fontSize: '1.5em'
          }}>
            Start Ride Session
          </h3>
          <p style={{
            color: '#b0b0b0',
            marginBottom: '1.5rem',
            fontSize: '1.1em'
          }}>
            Create a QR code for passengers to join your ride
          </p>
          <button
            onClick={handleGenerateQR}
            style={{
              padding: '0.75rem 1.5rem',
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
          >
            Generate Session QR Code
          </button>
          {qrCodeUrl && (
            <div style={{
              marginTop: '2rem',
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <p style={{
                color: '#e0e0e0',
                marginBottom: '1rem',
                fontSize: '1.1em'
              }}>
                Session Code: <strong>{sessionCode}</strong>
              </p>
              <img
                src={qrCodeUrl}
                alt="Session QR Code"
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '8px',
                  border: '2px solid rgba(255, 255, 255, 0.3)'
                }}
              />
              <p style={{
                color: '#b0b0b0',
                marginTop: '1rem',
                fontSize: '0.9em'
              }}>
                Scan this QR code to join the ride session
              </p>
            </div>
          )}
        </div>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          marginBottom: '2rem',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{
            color: '#e0e0e0',
            marginBottom: '0.5rem',
            fontSize: '1.5em'
          }}>
            My Certification
          </h3>
          <p style={{
            color: '#b0b0b0',
            marginBottom: '1.5rem',
            fontSize: '1.1em'
          }}>
            View and manage your operator certification
          </p>
          <button
            onClick={handleViewCertification}
            style={{
              padding: '0.75rem 1.5rem',
              border: 'none',
              borderRadius: '8px',
              background: 'linear-gradient(90deg, #4CAF50, #45a049)',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
              boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            View Certification Details
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
            fontSize: '1.5em'
          }}>
            Recent Ride History
          </h3>
          <p style={{
            color: '#b0b0b0',
            marginBottom: '1rem',
            fontSize: '1.1em'
          }}>
            Your last completed rides
          </p>
          <p style={{
            color: '#888',
            fontSize: '1rem',
            fontStyle: 'italic'
          }}>
            No ride history yet. Start a session to get started!
          </p>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
