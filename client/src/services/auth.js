import axios from 'axios';

// Use environment variable for API URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
const API_URL = `${API_BASE_URL}/api/auth`;

export const register = async (name, email, password) => {
  try {
    console.log('🔐 Attempting to register user...');
    console.log('📤 Sending to:', `${API_URL}/register`);
    
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });
    
    console.log('✅ Registration successful:', response.data);
    
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
      console.log('💾 User saved to localStorage');
    }
    
    return response.data;
  } catch (error) {
    console.error('❌ Registration error:');
    console.error('Error message:', error.message);
    
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    
    const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
    throw new Error(errorMessage);
  }
};

export const login = async (email, password) => {
  try {
    console.log('🔐 Attempting to login...');
    
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });
    
    console.log('✅ Login successful:', response.data);
    
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
      console.log('💾 User saved to localStorage');
    }
    
    return response.data;
  } catch (error) {
    console.error('❌ Login error:');
    console.error('Error message:', error.message);
    
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    
    const errorMessage = error.response?.data?.message || error.message || 'Login failed';
    throw new Error(errorMessage);
  }
};

export const logout = () => {
  localStorage.removeItem('user');
  console.log('👋 User logged out');
};
