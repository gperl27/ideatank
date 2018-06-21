const express = require('express');
const router = express.Router();
const UsersController = require('./users');
const IdeasController = require('./ideas');
const AuthController = require('./auth');
const passport = require('passport');
require('../services/passport');
const requireAuth = passport.authenticate('jwt', { session: false });

router.use('/auth', AuthController);
router.use('/users', requireAuth, UsersController);
router.use('/ideas', requireAuth, IdeasController);

module.exports = router;
