const mongoose = require('mongoose');

const ThoughtSchema = mongoose.Schema({
    type: {
        type: 'String',
        enum: [
            'pro',
            'con',
            'inspiration'
        ],
        required: true
    },
    text: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    } // possibly dont require in case of anon users
});

const Thought = mongoose.model('Thought', ThoughtSchema);

module.exports = Thought;