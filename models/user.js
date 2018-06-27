const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    name: { type: String, default: 'Anonymous' },
    email: { type: String, unique: true, lowercase: true },
    password: { type: String, select: false },
    ideas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Idea'
    }]
});

// On Save Hook, encrypt password
// Before saving a model, run this function
UserSchema.pre('save', function (next) {
    // get access to the user model
    const user = this;
    const saltRounds = 10;
    // generate a salt then run callback
    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) { return next(err); }

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) { return next(err); }

            // overwrite plain text password with encrypted password
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) { return callback(err); }

        callback(null, isMatch);
    });
}

UserSchema.virtual('currentIdea').get(function () {
    const Idea = mongoose.model('Idea');

    return Idea.findOne({
        isCompleted: false,
        $or: [
            { creator: this._id },
            {
                participants: {
                    _id: this._id
                }
            }
        ]
    })
        .sort({ createdAt: 'descending' })
        .populate('creator')
        .populate('participants')
        .populate({
            path: 'thoughts',
            populate: {
                path: 'user',
                model: 'User'
            }
        })
        .exec()
});

const User = mongoose.model('User', UserSchema);

module.exports = User;