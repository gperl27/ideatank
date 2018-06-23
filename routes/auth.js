require('dotenv');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/user');

const requireSignin = passport.authenticate('local', { session: false });

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.sign({ sub: user._id, iat: timestamp }, process.env.JWT_SECRET)
}

router.get('/user', function (req, res, next) {
    if (req.headers && req.headers.authorization) {
        let decoded;
        let authorization = req.headers.authorization;
        try {
            decoded = jwt.verify(authorization, process.env.JWT_SECRET);
        } catch (e) {
            return res.status(401).send({ error: 'unauthorized' });
        }
        var userId = decoded.sub;
        // Fetch the user by id 
        return User.findOne({ _id: userId })
            .then(async function (user) {
                const currentIdea = await user.currentIdea;

                return res.send({ user, currentIdea });
            });
    }
    return res.status(500);
})

router.post('/login', requireSignin, function (req, res, next) {
    // User has already had their email and password auth'd
    // We just need to give them a token
    const { user } = req;

    res.send({ token: tokenForUser(user) });
});

router.post('/register', function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).send({ error: 'You must provide email and password' });
    }

    // See if a user with the given email exists
    User.findOne({ email: email }, '+password', function (err, existingUser) {
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