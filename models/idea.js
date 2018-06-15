const mongoose = require('mongoose');

const IdeaSchema = mongoose.Schema({
    description: String,
    phase: {
        type: String,
        enum: [
            'problemsBeingSolved',
            'obstacles',
            'inspirations',
            'feasibility'
        ],
        default: 'problemsBeingSolved'
    },
    creator: { // validate required
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    thoughts: [Number], // validate that creator or participant can add these
    ratings: [Number]
});

// virtual => "usersInRoom" => creator + participants

const Idea = mongoose.model('Idea', IdeaSchema);

module.exports = Idea;