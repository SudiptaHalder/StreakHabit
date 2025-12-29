import React, { useState } from 'react';
import { updateHabit, deleteHabit } from '../../services/api';
import StreakCalendar from './StreakCalendar';

const HabitItem = ({ habit, onUpdate, onDelete, token }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCalendar, setShowCalendar] = useState(true); // Auto-show calendar

  const handleToggle = async () => {
    if (loading) return;
    
    try {
      setLoading(true);
      setError('');
      
      // Check if today is already marked
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const todayEntry = habit.completedDates.find(entry => {
        const entryDate = new Date(entry.date);
        entryDate.setHours(0, 0, 0, 0);
        return entryDate.getTime() === today.getTime();
      });
      
      const isCompletedToday = todayEntry ? todayEntry.completed : false;
      const updatedHabit = await updateHabit(habit._id, { completed: !isCompletedToday }, token);
      
      if (onUpdate) {
        onUpdate(updatedHabit);
      }
    } catch (err) {
      setError('Failed to update habit');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this habit? All progress will be lost.')) {
      return;
    }
    
    try {
      setLoading(true);
      await deleteHabit(habit._id, token);
      
      if (onDelete) {
        onDelete(habit._id);
      }
    } catch (err) {
      setError('Failed to delete habit');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getTodayStatus = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayEntry = habit.completedDates.find(entry => {
      const entryDate = new Date(entry.date);
      entryDate.setHours(0, 0, 0, 0);
      return entryDate.getTime() === today.getTime();
    });
    
    return todayEntry ? todayEntry.completed : false;
  };

  const todayStatus = getTodayStatus();

  return (
    <div className={`habit-item ${todayStatus ? 'completed' : ''} fade-in`}>
      <div className="habit-header">
        <h3>{habit.name}</h3>
        <button onClick={handleDelete} className="delete-btn" disabled={loading}>
          ×
        </button>
      </div>
      
      {habit.description && (
        <p className="habit-description">{habit.description}</p>
      )}
      
      <div className="habit-stats">
        <div className="stat">
          <span className="stat-label">Current Streak</span>
          <span className="stat-value">
            {habit.currentStreak} 
            <span style={{ color: '#dd6b20', marginLeft: '5px' }}>🔥</span>
          </span>
        </div>
        <div className="stat">
          <span className="stat-label">Longest Streak</span>
          <span className="stat-value">{habit.longestStreak}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Created</span>
          <span className="stat-value">
            {new Date(habit.createdAt).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric' 
            })}
          </span>
        </div>
      </div>
      
      <div className="habit-actions">
        <button
          onClick={handleToggle}
          disabled={loading}
          className={`toggle-btn ${todayStatus ? 'completed' : ''}`}
        >
          {loading ? (
            <span className="pulse">...</span>
          ) : todayStatus ? (
            <>
              <span>✓</span> Completed Today
            </>
          ) : (
            <>
              <span>+</span> Mark as Done Today
            </>
          )}
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {/* Show/Hide Calendar Toggle */}
      <div style={{ textAlign: 'center', margin: '20px 0 10px' }}>
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          style={{
            background: 'none',
            border: 'none',
            color: '#667eea',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            margin: '0 auto'
          }}
        >
          {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
          <span>{showCalendar ? '▲' : '▼'}</span>
        </button>
      </div>
      
      {/* Streak Calendar */}
      {showCalendar && <StreakCalendar habit={habit} />}
    </div>
  );
};

export default HabitItem;
