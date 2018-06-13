const mongoose = require('mongoose');

const IdeaSchema = mongoose.Schema({
    description: String,
    phase: String, // enum
    creator: Number, // User
    participants: [Number],
    thoughts: [Number],
    ratings: [Number]
});

const Idea = mongoose.model('Idea', IdeaSchema);

module.exports = Idea;