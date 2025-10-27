import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
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

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/driver" element={<DriverDashboard />} />
            <Route path="/passenger" element={<PassengerDashboard />} />
            <Route path="/association" element={<AssociationDashboard />} />
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
