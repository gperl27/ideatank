const mongoose = require('mongoose');

const IdeaSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false,
        required: true
    },
    phases: [{ // using save hook to create default phases
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Phase'
    }],
    creator: { // validate required
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    ratings: [Number],
}, { timestamps: true, toJSON: { virtuals: true } });

const defaultPhases = [
    {
        active: true,
        order: 0,
    },
    {
        order: 1,
        length: 120000, // 120000
        instructions: 'What are the problems this idea is solving?'
    },
    {
        order: 2,
        length: 120000, //120000
        instructions: 'What are the obstacles this idea faces?'
    },
    {
        order: 3,
        length: 60000, //60000
        instructions: 'What are some inspirations or similar concepts to this idea?'
    },
]

// seed the idea with the default game phases
IdeaSchema.pre('save', function (next) {
    const idea = this;
    if (!idea.isNew) {
        return next();
    }
    const Phase = mongoose.model('Phase');
    const dbPromises = [];

    // save each phase and add to idea's phases
    defaultPhases.forEach(function (phase) {
        const newPhase = new Phase(phase);
        idea.phases.push(newPhase);
        dbPromises.push(newPhase.save())
    });

    // resolve every async write
    Promise.all(dbPromises)
        .then(vals => {
            next();
        })
});

IdeaSchema.virtual('roomUsers').get(function () {
    return [...this.participants, this.creator];
});

IdeaSchema.statics.findIdeasInLobby = function () {
    return this.aggregate([
        { $match: { isCompleted: false } },
        { $sort: { createdAt: 1 } },
        {
            $lookup: {
                from: 'phases',
                localField: 'phases',
                foreignField: '_id',
                as: 'phases'
            }
        },
        { $unwind: "$phases" },
        { $match: { "phases.order": 0, "phases.active": true } },
        {
            $lookup: {
                from: 'users',
                localField: 'participants',
                foreignField: '_id',
                as: 'participants'
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'creator',
                foreignField: '_id',
                as: 'creator'
            }
        },
        { $unwind: "$creator" },
        {
            $project: {
                "creator.password": 0,
                "participants.password": 0,
            }
        }
    ])
};

IdeaSchema.statics.findByIdWithRelations = function (idea) {
    return this.findById(idea._id)
        .populate('creator')
        .populate('participants')
        .populate({
            path: 'phases',
            populate: {
                path: 'thoughts',
                populate: {
                    path: 'user',
                    model: 'User'
                }
            }
        })
};

IdeaSchema.statics.nextPhase = async function (idea) {
    const currentIdea = await this.findById(idea._id).populate('phases')
    const Phase = mongoose.model('Phase');
    const currentPhase = currentIdea.phases.find(phase => phase.active)
    const nextPhase = currentIdea.phases.find(phase => phase.order === currentPhase.order + 1)

    // set current phase's active to false no matter what
    let updates = [Phase.findByIdAndUpdate(currentPhase._id, { active: false })];

    // if there's no next phase
    // mark as complete
    // else mark the next phase as active
    if (!nextPhase) {
        currentIdea.isCompleted = true;
        updates.push(currentIdea.save())
    } else {
        updates.push(Phase.findByIdAndUpdate(nextPhase._id, { active: true }))
    }

    // use arrow function here to still refer to Model 'this'
    return Promise.all(updates)
        .then(_ => this.findByIdWithRelations(currentIdea._id))
};


const Idea = mongoose.model('Idea', IdeaSchema);

module.exports = Idea;