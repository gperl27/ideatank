const express = require('express');
const router = express.Router();

const Idea = require('../models/idea');

router.get('/lobby', async (req, res, next) => {
    try {
        const ideas = await Idea.findIdeasInLobby();
        res.send(ideas);
    } catch (err) {
        next(err);
    }
});

module.exports = router;