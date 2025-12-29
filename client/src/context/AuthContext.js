import React, { createContext, useState, useContext, useEffect } from 'react';
import { login, register } from '../services/auth';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    console.log('🔍 Checking localStorage for user:', userData);
    
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        console.log('✅ User found in localStorage:', parsedUser.email);
        console.log('🔑 Token exists:', !!parsedUser.token);
        setUser(parsedUser);
      } catch (error) {
        console.error('❌ Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    } else {
      console.log('👤 No user found in localStorage');
    }
    setLoading(false);
  }, []);

  const signIn = async (email, password) => {
    try {
      console.log('🔐 Signing in...');
      const userData = await login(email, password);
      
      console.log('✅ Login successful, user data:', {
        email: userData.email,
        hasToken: !!userData.token,
        tokenPreview: userData.token ? userData.token.substring(0, 20) + '...' : 'No token'
      });
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      console.log('💾 User saved to localStorage');
      return { success: true };
    } catch (error) {
      console.error('❌ Sign in error:', error.message);
      return { success: false, error: error.message };
    }
  };

  const signUp = async (name, email, password) => {
    try {
      console.log('📝 Signing up...');
      const userData = await register(name, email, password);
      
      console.log('✅ Registration successful, user data:', {
        email: userData.email,
        hasToken: !!userData.token
      });
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      console.log('💾 User saved to localStorage');
      return { success: true };
    } catch (error) {
      console.error('❌ Sign up error:', error.message);
      return { success: false, error: error.message };
    }
  };

  const signOut = () => {
    console.log('👋 Signing out...');
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    signIn,
    signUp,
    signOut,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
