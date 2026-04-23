const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

function sendAuthResponse(res, user, statusCode) {
  res.status(statusCode).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    dateOfBirth: user.dateOfBirth,
    role: user.role,
    isAdmin: user.isAdmin,
    token: generateToken(user._id)
  });
}

async function registerUser(req, res, next) {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
      phoneNumber,
      dateOfBirth,
      role
    } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      res.status(400);
      throw new Error('Please fill in all required fields');
    }

    if (password !== confirmPassword) {
      res.status(400);
      throw new Error('Passwords do not match');
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400);
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      dateOfBirth,
      role: role === 'vendor' ? 'vendor' : 'customer'
    });

    sendAuthResponse(res, user, 201);
  } catch (error) {
    next(error);
  }
}

async function authUser(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Please enter your email and password');
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(401);
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401);
      throw new Error('Invalid email or password');
    }

    sendAuthResponse(res, user, 200);
  } catch (error) {
    next(error);
  }
}

async function getUserProfile(req, res, next) {
  try {
    const user = await User.findById(req.user._id).select('-password');

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  registerUser,
  authUser,
  getUserProfile
};
