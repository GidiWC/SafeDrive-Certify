import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import type { RootState } from './store';
import { store } from './store';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DriverDashboard from './pages/DriverDashboard';
import PassengerDashboard from './pages/PassengerDashboard';
import AssociationDashboard from './pages/AssociationDashboard';
import Certification from './pages/Certification';
import ReportIncident from './pages/ReportIncident';
import Rewards from './pages/Rewards';
import './App.css';

const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles: string[] }> = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/driver" element={<ProtectedRoute allowedRoles={['driver']}><DriverDashboard /></ProtectedRoute>} />
            <Route path="/passenger" element={<ProtectedRoute allowedRoles={['passenger']}><PassengerDashboard /></ProtectedRoute>} />
            <Route path="/association" element={<ProtectedRoute allowedRoles={['association']}><AssociationDashboard /></ProtectedRoute>} />
            <Route path="/certification" element={<Certification />} />
            <Route path="/report" element={<ReportIncident />} />
            <Route path="/rewards" element={<Rewards />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
