import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'driver' | 'passenger' | 'association'>('passenger');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
      dispatch(login({
        user: { id: user.uid, name, email: user.email!, role },
        token: await user.getIdToken()
      }));
      // Redirect based on role
      if (role === 'driver') {
        navigate('/driver');
      } else if (role === 'association') {
        navigate('/association');
      } else {
        navigate('/passenger');
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '1rem' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as 'driver' | 'passenger' | 'association')}
            style={{ width: '100%', padding: '0.5rem' }}
          >
            <option value="passenger">Passenger</option>
            <option value="driver">Driver</option>
            <option value="association">Association</option>
          </select>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ width: '100%', padding: '0.5rem' }}>Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Register;
