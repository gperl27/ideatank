var express = require('express');
var router = express.Router();
const UsersController = require('./users');

router.use('/users', UsersController);

module.exports = router;