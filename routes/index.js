const express = require('express');
const router = express.Router();
const UsersController = require('./users');

router.use('/users', UsersController);

module.exports = router;
