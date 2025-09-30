const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/admin');

const router = express.Router();

// Get all users (admin only)
router.get('/users', auth, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select('name regNo role');
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Add a new student or faculty
router.post('/addUser', auth, adminOnly, async (req, res) => {
  try {
    const { name, regNo, role, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ regNo });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      name,
      regNo,
      role,
      password: hashedPassword
    });

    await user.save();
    res.json({ msg: 'User created successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
