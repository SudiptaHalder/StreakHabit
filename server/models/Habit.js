const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please enter habit name'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  targetDays: {
    type: Number,
    default: 30
  },
  completedDates: [{
    date: {
      type: Date,
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    }
  }],
  currentStreak: {
    type: Number,
    default: 0
  },
  longestStreak: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate streaks before saving
habitSchema.pre('save', function(next) {
  // Sort completedDates by date
  this.completedDates.sort((a, b) => a.date - b.date);
  
  // Calculate current streak
  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  
  for (let i = this.completedDates.length - 1; i >= 0; i--) {
    const entry = this.completedDates[i];
    const entryDate = new Date(entry.date);
    entryDate.setHours(0, 0, 0, 0);
    
    const diffDays = Math.floor((currentDate - entryDate) / (1000 * 60 * 60 * 24));
    
    if (diffDays === streak && entry.completed) {
      streak++;
    } else {
      break;
    }
  }
  
  this.currentStreak = streak;
  
  // Update longest streak if current is longer
  if (streak > this.longestStreak) {
    this.longestStreak = streak;
  }
  
  next();
});

module.exports = mongoose.model('Habit', habitSchema);
