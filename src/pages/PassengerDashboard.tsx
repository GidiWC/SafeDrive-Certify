import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import QrScanner from 'qr-scanner';

const PassengerDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [sessionCode, setSessionCode] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleScanQR = () => {
    setShowScanner(true);
    setShowCodeInput(false);
  };

  useEffect(() => {
    if (showScanner) {
      const videoElement = document.getElementById('qr-video') as HTMLVideoElement;
      if (videoElement) {
        const qrScanner = new QrScanner(
          videoElement,
          (result) => {
            handleJoinSession(result.data);
            qrScanner.stop();
          },
          {
            onDecodeError: (err) => {
              console.error('QR decode error:', err);
            },
            highlightScanRegion: true,
            highlightCodeOutline: true,
          }
        );
        qrScanner.start().catch((err) => {
          console.error('QR scanner start error:', err);
        });
        return () => {
          qrScanner.stop();
        };
      }
    }
  }, [showScanner]);

  const handleEnterSessionCode = () => {
    setShowCodeInput(true);
    setShowScanner(false);
  };

  const handleJoinSession = (code: string) => {
    alert(`Joining session with code: ${code}`);
    // Here you would typically dispatch an action to join the session
    setSessionCode('');
    setShowScanner(false);
    setShowCodeInput(false);
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sessionCode.trim()) {
      handleJoinSession(sessionCode.trim());
    }
  };

  const handleFileIncidentReport = () => {
    navigate('/report');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: '"Poppins", sans-serif',
      color: '#fff',
      padding: '2rem'
    }}>
      {user && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)'
        }}>
          <h1 style={{ fontSize: '2.5em', fontWeight: 'bold', marginBottom: '0.5rem' }}>Welcome, {user.name}</h1>
          <p style={{ fontSize: '1.2em', color: '#e0e0e0' }}>{user.email}</p>
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '2rem',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
          transition: 'transform 0.3s ease'
        }}>
          <h3 style={{ fontSize: '1.5em', marginBottom: '1rem', color: '#00CC66' }}>Total Rides</h3>
          <p style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>0</p>
          <p style={{ color: '#e0e0e0' }}>Rides completed</p>
        </div>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '2rem',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
          transition: 'transform 0.3s ease'
        }}>
          <h3 style={{ fontSize: '1.5em', marginBottom: '1rem', color: '#FFD700' }}>Ratings Given</h3>
          <p style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>0</p>
          <p style={{ color: '#e0e0e0' }}>Operators rated</p>
        </div>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '2rem',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
          transition: 'transform 0.3s ease'
        }}>
          <h3 style={{ fontSize: '1.5em', marginBottom: '1rem', color: '#FF6B6B' }}>Incidents Reported</h3>
          <p style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>0</p>
          <p style={{ color: '#e0e0e0' }}>Total reports</p>
        </div>
      </div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)'
      }}>
        <h3 style={{ fontSize: '1.8em', marginBottom: '1rem', color: '#4ECDC4' }}>Join Ride Session</h3>
        <p style={{ marginBottom: '1.5rem', color: '#e0e0e0' }}>Scan or enter a QR code to join an active ride</p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            style={{
              padding: '0.75rem 1.5rem',
              border: 'none',
              borderRadius: '8px',
              background: 'linear-gradient(90deg, #667eea, #764ba2)',
              color: '#fff',
              fontSize: '1em',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, opacity 0.2s ease'
            }}
            onClick={handleScanQR}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Scan QR Code
          </button>
          <button
            style={{
              padding: '0.75rem 1.5rem',
              border: 'none',
              borderRadius: '8px',
              background: 'linear-gradient(90deg, #f093fb, #f5576c)',
              color: '#fff',
              fontSize: '1em',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, opacity 0.2s ease'
            }}
            onClick={handleEnterSessionCode}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Enter Session Code
          </button>
        </div>
        {showScanner && (
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <video
              id="qr-video"
              style={{
                width: '100%',
                maxWidth: '300px',
                borderRadius: '8px',
                marginBottom: '1rem'
              }}
            ></video>
            <button
              onClick={() => setShowScanner(false)}
              style={{
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '8px',
                background: '#FF6B6B',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        )}
        {showCodeInput && (
          <form onSubmit={handleCodeSubmit} style={{ marginTop: '1.5rem' }}>
            <input
              type="text"
              value={sessionCode}
              onChange={(e) => setSessionCode(e.target.value)}
              placeholder="Enter session code"
              style={{
                width: '100%',
                padding: '0.75rem',
                marginBottom: '1rem',
                border: 'none',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.2)',
                color: '#fff',
                fontSize: '1em'
              }}
            />
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                type="submit"
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: 'none',
                  borderRadius: '8px',
                  background: 'linear-gradient(90deg, #4ECDC4, #44A08D)',
                  color: '#fff',
                  fontSize: '1em',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Join
              </button>
              <button
                type="button"
                onClick={() => setShowCodeInput(false)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: 'none',
                  borderRadius: '8px',
                  background: '#FF6B6B',
                  color: '#fff',
                  fontSize: '1em',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)'
      }}>
        <h3 style={{ fontSize: '1.8em', marginBottom: '1rem', color: '#FFA07A' }}>Report Incident</h3>
        <p style={{ marginBottom: '1.5rem', color: '#e0e0e0' }}>Report safety concerns or conflicts anonymously</p>
        <button
          style={{
            padding: '0.75rem 1.5rem',
            border: 'none',
            borderRadius: '8px',
            background: 'linear-gradient(90deg, #FF6B6B, #EE5A24)',
            color: '#fff',
            fontSize: '1em',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, opacity 0.2s ease'
          }}
          onClick={handleFileIncidentReport}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          File Incident Report
        </button>
      </div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '2rem',
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)'
      }}>
        <h3 style={{ fontSize: '1.8em', marginBottom: '1rem', color: '#98D8C8' }}>Recent Rides</h3>
        <p style={{ marginBottom: '1rem', color: '#e0e0e0' }}>Your ride history and ratings</p>
        <p style={{ color: '#ccc', fontStyle: 'italic' }}>No ride history yet. Join a session to get started!</p>
      </div>
    </div>
  );
};

export default PassengerDashboard;
