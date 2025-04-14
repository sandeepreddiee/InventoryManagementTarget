// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import ProductManagement from './ProductManagement';
import SalesHistory from './SalesHistory';
import Analytics from './Analytics';
import Notifications from './Notifications';
import './Dashboard.css';
import { jwtDecode } from 'jwt-decode';

const Dashboard = () => {
  const [view, setView] = useState('products');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser?.id_token) {
      try {
        const decoded = jwtDecode(storedUser.id_token);
        setUsername(decoded.email || decoded['cognito:username'] || 'User');
      } catch (err) {
        console.error('Token decode failed', err);
        setUsername('User');
      }
    } else {
      setUsername('User');
    }
  }, []);

  const renderView = () => {
    switch (view) {
      case 'products':
        return <ProductManagement />;
      case 'sales':
        return <SalesHistory />;
      case 'analytics':
        return <Analytics />;
      case 'notifications':
        return <Notifications />;
      default:
        return <ProductManagement />;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login'; 
  };
  

  return (
    <div className="dashboardWrapper">
      <div className="dashboard-header">
        <h1>Inventory Dashboard</h1>
        <div className="user-section">
          <span>Welcome, {username} 👋</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="dashboard-nav">
        <button className={view === 'products' ? 'active' : ''} onClick={() => setView('products')}>
          Product Management
        </button>
        <button className={view === 'sales' ? 'active' : ''} onClick={() => setView('sales')}>
          Sales History
        </button>
        <button className={view === 'analytics' ? 'active' : ''} onClick={() => setView('analytics')}>
          Analytics
        </button>
        <button className={view === 'notifications' ? 'active' : ''} onClick={() => setView('notifications')}>
          Notifications
        </button>
      </div>

      <div className="dashboard-content">{renderView()}</div>
    </div>
  );
};

export default Dashboard;