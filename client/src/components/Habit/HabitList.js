import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getHabits } from '../../services/api';
import HabitItem from './HabitItem';

const HabitList = () => {
  const { user } = useAuth();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (user?.token) {
      fetchHabits();
    }
  }, [user]);

  const fetchHabits = async () => {
    if (!user?.token) {
      console.log('No user token available');
      return;
    }

    try {
      // Don't show loading on refresh
      if (!refreshing) {
        setLoading(true);
      }
      setError('');
      
      console.log('Fetching habits...');
      const data = await getHabits(user.token);
      
      console.log(`Fetched ${data.length} habits`);
      setHabits(data);
    } catch (err) {
      console.error('Failed to fetch habits:', err);
      setError(`Failed to load habits: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchHabits();
  };

  const handleHabitUpdated = (updatedHabit) => {
    setHabits(habits.map(habit => 
      habit._id === updatedHabit._id ? updatedHabit : habit
    ));
  };

  const handleHabitDeleted = (habitId) => {
    setHabits(habits.filter(habit => habit._id !== habitId));
  };

  if (!user) {
    return (
      <div className="habits-container">
        <div className="empty-state">
          <div className="icon">🔒</div>
          <h3>Please Login</h3>
          <p>Sign in to view and manage your habits</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="habits-container">
        <div className="empty-state">
          <div className="icon pulse">⏳</div>
          <h3>Loading Habits</h3>
          <p>Fetching your habits from the server...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="habits-container">
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <h2>Your Habits</h2>
        
        <div style={{ display: 'flex', gap: '15px' }}>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s'
            }}
          >
            {refreshing ? 'Refreshing...' : '🔄 Refresh'}
          </button>
          
          <div style={{
            background: '#edf2f7',
            padding: '12px 20px',
            borderRadius: '12px',
            fontWeight: '600',
            color: '#4a5568'
          }}>
            Total: {habits.length} {habits.length === 1 ? 'habit' : 'habits'}
          </div>
        </div>
      </div>
      
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button 
            onClick={fetchHabits}
            style={{
              marginTop: '15px',
              padding: '10px 20px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Try Again
          </button>
        </div>
      )}
      
      {habits.length === 0 ? (
        <div className="empty-state">
          <div className="icon">📝</div>
          <h3>No Habits Yet</h3>
          <p>Start building your first habit today!</p>
          <p style={{ fontSize: '1rem', marginTop: '10px', color: '#a0aec0' }}>
            Create a habit using the form on the left
          </p>
        </div>
      ) : (
        <>
          <div className="habits-grid">
            {habits.map(habit => (
              <HabitItem
                key={habit._id}
                habit={habit}
                onUpdate={handleHabitUpdated}
                onDelete={handleHabitDeleted}
                token={user.token}
              />
            ))}
          </div>
          
          {/* Summary Stats */}
          {habits.length > 0 && (
            <div className="card" style={{ marginTop: '40px' }}>
              <h3 style={{ marginBottom: '20px' }}>📈 Habit Summary</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: '#667eea' }}>
                    {habits.length}
                  </div>
                  <div style={{ color: '#718096', marginTop: '8px' }}>Total Habits</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: '#48bb78' }}>
                    {habits.reduce((sum, habit) => sum + habit.currentStreak, 0)}
                  </div>
                  <div style={{ color: '#718096', marginTop: '8px' }}>Total Current Streak</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: '#dd6b20' }}>
                    {Math.max(...habits.map(h => h.currentStreak), 0)}
                  </div>
                  <div style={{ color: '#718096', marginTop: '8px' }}>Best Current Streak</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: '#9f7aea' }}>
                    {habits.reduce((sum, habit) => sum + habit.completedDates.filter(d => d.completed).length, 0)}
                  </div>
                  <div style={{ color: '#718096', marginTop: '8px' }}>Total Check-ins</div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HabitList;
