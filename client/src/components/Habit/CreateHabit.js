import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createHabit } from '../../services/api';

const CreateHabit = ({ onHabitCreated }) => {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [targetDays, setTargetDays] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setError('Please login to create habits');
      return;
    }
    
    if (!name.trim()) {
      setError('Habit name is required');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      const habitData = {
        name: name.trim(),
        description: description.trim(),
        targetDays: parseInt(targetDays)
      };
      
      const newHabit = await createHabit(habitData, user.token);
      
      // Reset form
      setName('');
      setDescription('');
      setTargetDays(30);
      
      // Notify parent
      if (onHabitCreated) {
        onHabitCreated(newHabit);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create habit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-habit">
      <h3>Create New Habit</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Habit Name *</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Wake up early"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your habit..."
            rows="3"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="targetDays">Target Days</label>
          <input
            type="number"
            id="targetDays"
            value={targetDays}
            onChange={(e) => setTargetDays(e.target.value)}
            min="1"
            max="365"
          />
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Habit'}
        </button>
      </form>
    </div>
  );
};

export default CreateHabit;
