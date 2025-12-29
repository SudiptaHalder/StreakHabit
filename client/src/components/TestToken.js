import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const TestToken = () => {
  const { user } = useAuth();
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testToken = async () => {
    if (!user?.token) {
      setResult('❌ No token available');
      return;
    }

    setLoading(true);
    setResult('Testing...');

    try {
      console.log('🔑 Testing token:', user.token.substring(0, 20) + '...');
      
      const response = await axios.get('http://localhost:5001/api/test/test-protected', {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('✅ Token test response:', response.data);
      setResult(`✅ Success! User: ${response.data.user.email}`);
    } catch (error) {
      console.error('❌ Token test error:', error);
      
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
        setResult(`❌ Error ${error.response.status}: ${error.response.data?.message || 'Unknown error'}`);
      } else {
        setResult(`❌ Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: '#f8f9fa',
      padding: '20px',
      borderRadius: '10px',
      margin: '20px 0',
      border: '1px solid #dee2e6'
    }}>
      <h3>Token Test</h3>
      <p><strong>User:</strong> {user?.email || 'Not logged in'}</p>
      <p><strong>Token:</strong> {user?.token ? 'Present ✅' : 'Missing ❌'}</p>
      
      <button 
        onClick={testToken}
        disabled={loading || !user?.token}
        style={{
          padding: '10px 20px',
          background: user?.token ? '#28a745' : '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: user?.token ? 'pointer' : 'not-allowed',
          margin: '10px 0'
        }}
      >
        {loading ? 'Testing...' : 'Test Token'}
      </button>
      
      {result && (
        <div style={{
          marginTop: '10px',
          padding: '10px',
          background: result.includes('✅') ? '#d4edda' : '#f8d7da',
          color: result.includes('✅') ? '#155724' : '#721c24',
          borderRadius: '5px',
          fontFamily: 'monospace'
        }}>
          {result}
        </div>
      )}
      
      <div style={{ marginTop: '10px', fontSize: '0.9rem', color: '#666' }}>
        <p>This tests if your JWT token is valid and can access protected routes.</p>
      </div>
    </div>
  );
};

export default TestToken;
