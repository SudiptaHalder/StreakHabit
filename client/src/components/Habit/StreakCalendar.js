import React from 'react';
import { format, subDays, eachDayOfInterval, isSameDay } from 'date-fns';

const StreakCalendar = ({ habit }) => {
  // Create last 90 days
  const today = new Date();
  const ninetyDaysAgo = subDays(today, 89); // 90 days total including today
  
  const days = eachDayOfInterval({
    start: ninetyDaysAgo,
    end: today
  }).reverse(); // Reverse to show most recent first

  // Helper to check if a day is completed
  const isDayCompleted = (date) => {
    return habit.completedDates.some(entry => {
      const entryDate = new Date(entry.date);
      return isSameDay(entryDate, date) && entry.completed;
    });
  };

  // Helper to check if a day is missed (should have been completed but wasn't)
  const isDayMissed = (date) => {
    // For simplicity, let's mark days before habit creation as empty
    const habitCreationDate = new Date(habit.createdAt);
    if (date < habitCreationDate) return false;
    
    // Check if there's an entry for this day that's not completed
    const entry = habit.completedDates.find(e => isSameDay(new Date(e.date), date));
    return entry && !entry.completed;
  };

  // Calculate total completed days
  const totalCompleted = habit.completedDates.filter(entry => entry.completed).length;
  
  // Calculate completion percentage
  const completionPercentage = Math.min(100, (totalCompleted / habit.targetDays) * 100);

  return (
    <div className="streak-calendar fade-in">
      <h3>Streak Calendar</h3>
      
      <div className="calendar-grid">
        {days.map((day, index) => {
          let dayClass = 'calendar-day future';
          
          if (isDayCompleted(day)) {
            dayClass = 'calendar-day completed';
          } else if (isDayMissed(day)) {
            dayClass = 'calendar-day missed';
          } else if (day > today) {
            dayClass = 'calendar-day future';
          } else {
            dayClass = 'calendar-day empty';
          }
          
          return (
            <div 
              key={index}
              className={dayClass}
              title={format(day, 'MMMM d, yyyy')}
            >
              {format(day, 'd')}
            </div>
          );
        })}
      </div>
      
      <div className="streak-info">
        <div className="streak-count">
          <span className="label">Current Streak</span>
          <span className="value fire">
            {habit.currentStreak} 🔥
          </span>
        </div>
        
        <div className="streak-count">
          <span className="label">Longest Streak</span>
          <span className="value">
            {habit.longestStreak} days
          </span>
        </div>
        
        <div className="streak-count">
          <span className="label">Completion</span>
          <span className="value">
            {completionPercentage.toFixed(0)}%
          </span>
        </div>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          marginBottom: '8px',
          fontSize: '0.9rem',
          color: '#718096'
        }}>
          <span>{totalCompleted} / {habit.targetDays} days</span>
          <span>{habit.targetDays - totalCompleted} days remaining</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>
      
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginTop: '30px',
        fontSize: '0.9rem',
        color: '#718096'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '20px',
            height: '20px',
            background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
            borderRadius: '4px'
          }} />
          <span>Completed</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '20px',
            height: '20px',
            background: 'linear-gradient(135deg, #fc8181 0%, #f56565 100%)',
            borderRadius: '4px'
          }} />
          <span>Missed</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '20px',
            height: '20px',
            background: '#edf2f7',
            border: '2px solid #e2e8f0',
            borderRadius: '4px'
          }} />
          <span>Future</span>
        </div>
      </div>
    </div>
  );
};

export default StreakCalendar;
