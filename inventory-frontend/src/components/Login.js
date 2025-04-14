// src/components/Login.js
import React from 'react';
import styles from './Login.module.css';

const Login = () => {
  const handleCognitoLogin = () => {
    window.location.href = 'http://localhost:8081/oauth2/authorization/cognito';
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginCard}>
        <h2 className={styles.loginTitle}>🔐 Sign in to Inventory System</h2>

        <button onClick={handleCognitoLogin} className={styles.loginButton}>
          Login with AWS Cognito
        </button>

        <p className={styles.note}>You will be redirected to a secure login page.</p>
      </div>
    </div>
  );
};

export default Login;
