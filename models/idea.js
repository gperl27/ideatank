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
    phase: { // may want to consider using subdocuments in the future for dynamacy
        type: Object,
        enum: [
            {
                order: 0,
                key: 'groupFinding',
                thoughtType: null,
                length: null,
                instructions: null
            },
            {
                order: 1,
                key: 'problemsBeingSolved',
                thoughtType: 'pro',
                length: 10000, // 120000
                instructions: 'Solve Problems Here'
            },
            {
                order: 2,
                key: 'obstacles',
                thoughtType: 'con',
                length: 10000, //120000
                instructions: 'Solve Obstacles Here'
            },
            {
                order: 3,
                key: 'inspirations',
                thoughtType: 'inspiration',
                length: 10000, //60000
                instructions: 'Solve Inspirtations Here'
            },
            // { desc: 'feasibility', length: 0.20 },
        ],
        default: {
            order: 0,
            key: 'groupFinding',
            length: null,
            instructions: null
        },
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
    ratings: [Number],
}, { timestamps: true, toJSON: { virtuals: true } });

IdeaSchema.virtual('roomUsers').get(function () {
    return [...this.participants, this.creator];
});

IdeaSchema.statics.findIdeasInLobby = function () {
    return this.find({ isCompleted: false, 'phase.key': 'groupFinding' })
        .sort({ createdAt: 'descending' })
        .populate('creator')
        .populate('participants')
};

IdeaSchema.statics.updateIdeaAndReturnRelations = function (idea, update, options) {
    return this.findByIdAndUpdate(idea._id, update, options)
        .populate('creator')
        .populate('participants')
        .populate({
            path: 'thoughts',
            populate: {
                path: 'user',
                model: 'User'
            }
        })
};


const Idea = mongoose.model('Idea', IdeaSchema);

module.exports = Idea;