import axios from 'axios';

// Use environment variable for API URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
const FULL_API_URL = `${API_BASE_URL}/api`;

// Habit API calls
export const getHabits = async (token) => {
  const response = await axios.get(`${FULL_API_URL}/habits`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

export const createHabit = async (habitData, token) => {
  const response = await axios.post(`${FULL_API_URL}/habits`, habitData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

export const updateHabit = async (habitId, updateData, token) => {
  const response = await axios.put(`${FULL_API_URL}/habits/${habitId}`, updateData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

export const deleteHabit = async (habitId, token) => {
  const response = await axios.delete(`${FULL_API_URL}/habits/${habitId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

export const getHabit = async (habitId, token) => {
  const response = await axios.get(`${FULL_API_URL}/habits/${habitId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};
