const mongoose = require('mongoose');
const Idea = require('./idea');

const UserSchema = mongoose.Schema({
    name: String,
    ideas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Idea'
    }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;