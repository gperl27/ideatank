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
    thoughts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thought',
        validate: function (v) { // only the creator or participant can add a thought
            return this.roomUsers.filter(u => u._id === v.user._id)
        }
    }], 
    ratings: [Number]
});

IdeaSchema.virtual('roomUsers').get(function () {
    return [...this.participants, this.creator];
});

const Idea = mongoose.model('Idea', IdeaSchema);

module.exports = Idea;