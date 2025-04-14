// src/components/OAuthCallbackHandler.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const OAuthCallbackHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idToken = params.get('id_token');

    if (!idToken) {
      console.error('❌ OAuth callback missing tokens');
      return;
    }

    try {
      const decoded = jwtDecode(idToken);
      const user = {
        id_token: idToken,
        email: decoded.email,
        username: decoded['cognito:username'],
      };

      localStorage.setItem('user', JSON.stringify(user));
      navigate('/dashboard');
    } catch (err) {
      console.error('❌ Failed to decode token:', err);
    }
  }, [navigate]);

  return <div>Logging in...</div>;
};

export default OAuthCallbackHandler;
