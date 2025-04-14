// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import OAuthCallbackHandler from './components/OAuthCallbackHandler';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    localStorage.removeItem('user');

    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
    document.body.className = storedTheme;

    setAuthChecked(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.className = newTheme;
  };

  const ProtectedRoute = ({ children }) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    return storedUser?.id_token ? children : <Navigate to="/login" replace />;
  };

  if (!authChecked) return <div>Loading...</div>;

  return (
    <Router>
      <button className="theme-toggle" onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/auth/callback" element={<OAuthCallbackHandler />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
