const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Habit = require('../models/Habit');

// Get all habits for user
router.get('/', protect, async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user._id }).sort('-createdAt');
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new habit
router.post('/', protect, async (req, res) => {
  try {
    const { name, description, targetDays } = req.body;
    
    const habit = await Habit.create({
      user: req.user._id,
      name,
      description,
      targetDays
    });
    
    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update habit (mark as completed for today)
router.put('/:id', protect, async (req, res) => {
  try {
    const { completed } = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const habit = await Habit.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }
    
    // Find if entry exists for today
    const todayEntry = habit.completedDates.find(entry => {
      const entryDate = new Date(entry.date);
      entryDate.setHours(0, 0, 0, 0);
      return entryDate.getTime() === today.getTime();
    });
    
    if (todayEntry) {
      // Update existing entry
      todayEntry.completed = completed;
    } else {
      // Add new entry
      habit.completedDates.push({
        date: today,
        completed: completed
      });
    }
    
    await habit.save();
    
    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get habit by ID
router.get('/:id', protect, async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }
    
    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete habit
router.delete('/:id', protect, async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }
    
    res.json({ message: 'Habit removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
