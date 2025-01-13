// authenticate.js
const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT token
const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const verified = jwt.verify(token, 'your_jwt_secret');
    req.user = verified; // You can access the user info in the next middleware or route handler
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = authenticate;
