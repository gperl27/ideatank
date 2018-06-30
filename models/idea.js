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
    phases: [{ // using save hook to create default phases
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Phase',
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
        length: 100000, // 120000
        instructions: 'Solve Problems Here'
    },
    {
        order: 2,
        length: 100000, //120000
        instructions: 'Solve Obstacles Here'
    },
    {
        order: 3,
        length: 100000, //60000
        instructions: 'Solve Inspirtations Here'
    },
]

// seed the idea with the default game phases
IdeaSchema.pre('save', function (next) {
    const idea = this;
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
            console.log(vals);
            next();
        })
});

IdeaSchema.virtual('roomUsers').get(function () {
    return [...this.participants, this.creator];
});

IdeaSchema.statics.findIdeasInLobby = function () {
    return this.find({ isCompleted: false, 'phases.active': true })
        .sort({ createdAt: 'descending' })
        .populate('creator')
        .populate('participants')
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

IdeaSchema.statics.nextPhase = function (idea) {
    const Phase = mongoose.model('Phase');
    const currentPhase = idea.phases.find(phase => phase.active)
    const nextPhase = idea.phases.find(phase => phase.order === currentPhase.order + 1)

    let updates = [Phase.findByIdAndUpdate(currentPhase._id, { active: false })];

    // if there's no next phase
    // mark as complete
    // else mark the next phase as active
    if (!nextPhase) {
        updates.push(this.findByIdAndUpdate(idea._id, { isCompleted: true }))
    } else {
        updates.push(Phase.findByIdAndUpdate(nextPhase._id, { active: true }))
    }

    return Promise.all(updates)
        .then(function (_) {
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
        })
};


const Idea = mongoose.model('Idea', IdeaSchema);

module.exports = Idea;