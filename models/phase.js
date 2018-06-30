const mongoose = require('mongoose');

const PhaseSchema = mongoose.Schema({
    active: {
        type: Boolean,
        default: false,
    },
    order: {
        type: Number,
        required: true
    },
    length: Number,
    instructions: String,
    thoughts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thought',
        validate: {
            validator: function (v) {
                console.log(v);
                return true; //TODO replicate logic from idea model
            },
            message: 'Only the creator or participant can add a thought to this idea.'
        }
    }],
});

const Phase = mongoose.model('Phase', PhaseSchema);

module.exports = Phase;