import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SignIn from '../components/Auth/SignIn';
import SignUp from '../components/Auth/SignUp';
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mode, setMode] = useState('login');

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
    
    const queryParams = new URLSearchParams(location.search);
    const authMode = queryParams.get('mode');
    if (authMode === 'login' || authMode === 'register') {
      setMode(authMode);
    }
  }, [location, user, navigate]);

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h2>{mode === 'login' ? 'Sign In' : 'Create Account'}</h2>
          <p>
            {mode === 'login' 
              ? 'Sign in to track your habits' 
              : 'Join us to start building better habits'}
          </p>
        </div>
        
        {mode === 'login' ? <SignIn /> : <SignUp />}
        
        <div className="auth-footer">
          <p>
            {mode === 'login' 
              ? "Don't have an account? " 
              : "Already have an account? "}
            <button onClick={toggleMode} className="link-button">
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
