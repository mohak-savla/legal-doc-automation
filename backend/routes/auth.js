// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const router = express.Router();

// Registration Endpoint
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12); // Hash password before saving
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).send('User registered');
  } catch (error) {
    console.error('Registration error:', error); // Better error logging
    res.status(500).send('Error registering new user');
  }
});

// Login Endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).send('Authentication failed');
    }
    // Use environment variable for JWT secret
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error); // Better error logging
    res.status(500).send('Login error');
  }
});

module.exports = router;
