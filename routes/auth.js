const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/user');

const requireSignin = passport.authenticate('local', { session: false });

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.sign({ sub: user._id, iat: timestamp }, 'secret-key-here')
}

router.post('/login', requireSignin, function (req, res, next) {
    // User has already had their email and password auth'd
    // We just need to give them a token
    res.send({ token: tokenForUser(req.user) });
});

router.post('/register', function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).send({ error: 'You must provide email and password' });
    }

    // See if a user with the given email exists
    User.findOne({ email: email }, function (err, existingUser) {
        if (err) { return next(err); }

        // If a user with email does exist, return an error
        if (existingUser) {
            return res.status(422).send({ error: 'Email is in use' });
        }

        // If a user with email does NOT exist, create and save user record
        const user = new User({
            email: email,
            password: password
        });

        user.save(function (err) {
            if (err) { return next(err); }

            // Repond to request indicating the user was created
            res.json({ token: tokenForUser(user) });
        });
    });
});

module.exports = router;