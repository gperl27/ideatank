const mongoose = require('mongoose');

const ThoughtSchema = mongoose.Schema({
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