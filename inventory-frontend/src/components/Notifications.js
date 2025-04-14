import React, { useEffect, useState } from 'react';
import './Notifications.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      message: 'Low stock alert for Laptop',
      type: 'warning',
      action: 'Reorder Now',
      risk: 'High',
      quantityLeft: 3
    },
    {
      message: 'New sale recorded for Headphones',
      type: 'info',
      action: '',
      risk: 'None',
      quantityLeft: null
    },
    {
      message: 'System maintenance scheduled for Friday',
      type: 'info',
      action: '',
      risk: 'Low',
      quantityLeft: null
    },
    {
      message: 'Low stock alert for Monitor',
      type: 'warning',
      action: 'Reorder Now',
      risk: 'Medium',
      quantityLeft: 7
    }
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [animatedIndex, setAnimatedIndex] = useState(null);
  const [iconIndex, setIconIndex] = useState(null);

  const sound = new Audio('/reorder.mp3');

  const handleReorder = (index) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = storedUser?.id_token;

    if (!token) {
      console.warn("⚠️ No token found in localStorage");
      setPopupMessage("❌ Not authorized. Please log in again.");
      setShowPopup(true);
      return;
    }

    setAnimatedIndex(index);
    setIconIndex(index);
    sound.play();

    const productName = notifications[index].message.replace("Low stock alert for ", "");
    const receiverEmail = "sandeep.gandluri@gmail.com";

    fetch('http://localhost:8081/api/inventory/api/reorder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product: productName,
        email: receiverEmail,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed request");
        setPopupMessage(`✅ Reorder triggered for: ${productName}`);
        setShowPopup(true);
      })
      .catch((err) => {
        console.error("❌ Error triggering reorder email:", err);
        setPopupMessage("❌ Failed to send reorder email");
        setShowPopup(true);
      });

    setTimeout(() => {
      setAnimatedIndex(null);
      setIconIndex(null);
    }, 700);
  };

  const getRiskIcon = (risk) => {
    switch (risk) {
      case 'High': return '🚨';
      case 'Medium': return '⚠️';
      case 'Low': return 'ℹ️';
      default: return '';
    }
  };

  return (
    <div className="notifications-card">
      <div className="notification-header">
        <span role="img" aria-label="bell" className="emoji">🔔</span>
        <h2>Notifications</h2>
      </div>

      <ul className="notification-list">
        {notifications.map((note, index) => (
          <li key={index} className={`notification-item ${note.type}`}>
            <div className="note-message">
              {note.risk !== 'None' && <span className="risk-icon">{getRiskIcon(note.risk)}</span>} {note.message}
            </div>
            {note.risk !== 'None' && (
              <div className="note-details">
                <span className={`risk-label ${note.risk.toLowerCase()}`}>{getRiskIcon(note.risk)} Risk: {note.risk}</span>
                {note.quantityLeft !== null && (
                  <span className="stock-left">Items left: {note.quantityLeft}</span>
                )}
                {note.action && (
                  <button
                    className={`reorder-btn ${animatedIndex === index ? 'animate' : ''}`}
                    onClick={() => handleReorder(index)}
                  >
                    {note.action} {iconIndex === index && <span>✔️</span>}
                  </button>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>

      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-message">{popupMessage}</div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
