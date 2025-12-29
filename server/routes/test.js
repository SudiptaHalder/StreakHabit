const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Test unprotected route
router.get('/health', (req, res) => {
  res.json({
    message: 'Test route is working',
    timestamp: new Date().toISOString()
  });
});

// Test protected route
router.get('/test-protected', protect, (req, res) => {
  res.json({
    message: 'Protected route accessed successfully!',
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email
    },
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
