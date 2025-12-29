const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  console.log('\n🛡️ === PROTECT MIDDLEWARE TRIGGERED ===');
  console.log('📝 Route:', req.method, req.originalUrl);
  console.log('📦 Full URL:', req.protocol + '://' + req.get('host') + req.originalUrl);
  console.log('👤 Request body:', req.body);
  console.log('📋 Headers:', JSON.stringify(req.headers, null, 2));
  
  let token;
  
  // Check authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    console.log('✅ Authorization header found');
    token = req.headers.authorization.split(' ')[1];
    console.log('🔑 Token received:', token ? 'Present' : 'Missing');
    console.log('🔑 Token length:', token?.length || 0);
    console.log('🔑 Token (first 50 chars):', token?.substring(0, 50) + '...');
  } else {
    console.log('❌ No Bearer token in Authorization header');
    console.log('🔍 Authorization header value:', req.headers.authorization);
    
    // Check other possible locations
    console.log('🔍 Checking for token in other headers:');
    console.log('  x-access-token:', req.headers['x-access-token']);
    console.log('  token:', req.headers['token']);
  }
  
  if (!token) {
    console.log('❌ No token provided');
    return res.status(401).json({ 
      message: 'Not authorized, no token',
      receivedHeaders: Object.keys(req.headers),
      authorizationHeader: req.headers.authorization
    });
  }
  
  try {
    console.log('🔐 Verifying token...');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token verified successfully');
    console.log('👤 Decoded user ID:', decoded.id);
    console.log('⏰ Token issued at:', new Date(decoded.iat * 1000));
    console.log('⏰ Token expires at:', new Date(decoded.exp * 1000));
    console.log('⏰ Current time:', new Date());
    
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      console.log('❌ User not found in database for ID:', decoded.id);
      return res.status(401).json({ message: 'User not found' });
    }
    
    req.user = user;
    console.log('✅ User attached to request:', user.email);
    next();
  } catch (error) {
    console.error('❌ Token verification FAILED:', error.message);
    console.error('❌ Error name:', error.name);
    
    if (error.name === 'TokenExpiredError') {
      console.error('⏰ Token expired at:', new Date(error.expiredAt));
    }
    
    return res.status(401).json({ 
      message: 'Not authorized',
      error: error.message,
      errorType: error.name
    });
  }
};

module.exports = { protect };
