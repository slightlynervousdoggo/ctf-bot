const express = require('express');

const User = require('../../models/User');

const router = express.Router();

// @route   GET api/auth
// @desc    Get user by ID
// @access  Public
router.get('/', async (req, res) => {
  try {
    const user = await User.find().sort({ points: -1 });
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
