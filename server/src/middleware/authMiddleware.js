const User = require('../models/User');
const jwt = require('jsonwebtoken');

async function protect(req, res, next) {
  const token = req.headers.authorization?.startsWith('Bearer ')
    ? req.headers.authorization.split(' ')[1]
    : null;

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, token missing');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      res.status(401);
      throw new Error('Not authorized, user not found');
    }

    req.user = user;
    next();
  } catch (_error) {
    res.status(401);
    throw new Error('Not authorized, token invalid');
  }
}

function admin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    next();
    return;
  }

  res.status(403);
  throw new Error('Not authorized as admin');
}

module.exports = {
  protect,
  admin
};
