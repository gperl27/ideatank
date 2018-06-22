const express = require('express');
const router = express.Router();

const Idea = require('../models/idea');

router.get('/', async (req, res, next) => {
    const ideas = await Idea.find({});
    res.send(ideas);
});

router.get('/lobby', async (req, res, next) => {
    const ideas = await Idea.findIdeasInLobby();

    res.send(ideas);
});

module.exports = router;