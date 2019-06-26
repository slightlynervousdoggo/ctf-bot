const express = require('express');

const User = require('../../models/User');

const router = express.Router();

// @route   GET api/profile/user/:user_id
// @desc    GET profile by user ID
// @access  PUBLIC
router.get('/user/:user_id', async (req, res) => {
  try {
    const user = await User.findOne({ 'user.id': req.params.user_id });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
