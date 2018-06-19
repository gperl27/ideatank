const mongoose = require('mongoose');

const IdeaSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    phase: {
        type: String,
        enum: [
            'groupFinding',
            'problemsBeingSolved',
            'obstacles',
            'inspirations',
            'feasibility'
        ],
        default: 'groupFinding'
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
        validate: {
            validator: function (v) {
                return this.roomUsers.filter(u => u._id === v.user._id)
            },
            message: 'Only the creator or participant can add a thought to this idea.'
        }
    }],
    ratings: [Number]
});

IdeaSchema.virtual('roomUsers').get(function () {
    return [...this.participants, this.creator];
});

const Idea = mongoose.model('Idea', IdeaSchema);

module.exports = Idea;