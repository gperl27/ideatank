const express = require('express');
const router = express.Router();
const UsersController = require('./users');
const IdeasController = require('./ideas');

router.use('/users', UsersController);
router.use('/ideas', IdeasController);

module.exports = router;
