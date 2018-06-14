const mongoose = require('mongoose');

const IdeaSchema = mongoose.Schema({
    description: String,
    phase: String, // enum
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    thoughts: [Number],
    ratings: [Number]
});

// virtual => "usersInRoom" => creator + participants

const Idea = mongoose.model('Idea', IdeaSchema);

module.exports = Idea;