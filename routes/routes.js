const router = require('express').Router();

const auth = require('./api/auth');
const profile = require('./api/profile');

router.use('/api/auth', auth);
router.use('/api/profile', profile);

module.exports = router;
