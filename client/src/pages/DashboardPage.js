import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CreateHabit from '../components/Habit/CreateHabit';
import HabitList from '../components/Habit/HabitList';

const DashboardPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth?mode=login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div style={{ textAlign: 'center', padding: '100px 20px' }}>
          <div className="pulse" style={{ fontSize: '3rem', marginBottom: '20px' }}>⏳</div>
          <h2>Loading Dashboard...</h2>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard-page fade-in">
      <header className="dashboard-header">
        <h1>Welcome back, {user.name}! 👋</h1>
        <p>Track your progress and build amazing habits</p>
      </header>
      
      <div className="dashboard-content">
        {/* Left Sidebar */}
        <div className="dashboard-section">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px'
          }}>
            <h3 style={{ margin: 0 }}>Quick Actions</h3>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              style={{
                padding: '10px 20px',
                background: showCreateForm ? '#e2e8f0' : '#667eea',
                color: showCreateForm ? '#4a5568' : 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s'
              }}
            >
              {showCreateForm ? 'Hide' : '➕ New Habit'}
            </button>
          </div>
          
          {showCreateForm ? (
            <CreateHabit onHabitCreated={() => {
              // Refresh habits list when new habit is created
              window.location.reload(); // Simple refresh for now
            }} />
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🎯</div>
              <h3>Ready to build a new habit?</h3>
              <p style={{ color: '#718096', marginBottom: '30px' }}>
                Click "New Habit" to start tracking your progress
              </p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="btn btn-primary"
                style={{ padding: '15px 30px' }}
              >
                Create New Habit
              </button>
            </div>
          )}
          
          {/* User Stats Card */}
          <div className="card" style={{ marginTop: '40px' }}>
            <h4 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>👤</span> Your Profile
            </h4>
            <div style={{ marginBottom: '15px' }}>
              <div style={{ fontSize: '0.9rem', color: '#718096' }}>Email</div>
              <div style={{ fontWeight: '600' }}>{user.email}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', color: '#718096' }}>Member Since</div>
              <div style={{ fontWeight: '600' }}>
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="dashboard-section">
          <HabitList />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
