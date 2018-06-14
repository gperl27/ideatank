const mongoose = require('mongoose');
const User = require('../models/user');
const Idea = require('../models/idea');
const assert = require('assert');

describe('User Model', () => {
    describe('CRUD for single user', () => {
        let user;

        beforeEach(done => {
            user = new User({ name: 'Greg' });
            user.save(() => done())
        });

        it('can create a user', () => {
            assert(!user.isNew);
            assert(true)
        });

        it('can read a user', done => {
            User.find({ name: 'Greg' })
                .then(users => {
                    assert(users[0].name === 'Greg');
                    done();
                })
        });

        it('can update a user', done => {
            User.update({ name: 'Greg' }, { name: 'George' })
                .then(_ => User.find({ name: 'George' }))
                .then(users => {
                    assert(users[0].name === 'George');
                    done();
                })
        });

        it('can delete a user', done => {
            User.remove({ name: 'Greg' })
                .then(_ => User.find({ name: 'George' }))
                .then(users => {
                    assert(users.length === 0);
                    done();
                })
        });
    });

    describe('UserIdeas relation', () => {
        let user;

        beforeEach(done => {
            user = new User({ name: 'Greg' });
            idea = new Idea({ description: 'Idea summary' })
            user.ideas.push(idea)
            Promise.all([user.save(), idea.save()])
                .then(() => done())
        });

        it('user can add an idea', done => {
            User.findOne({ name: 'Greg' })
                .populate('ideas')
                .then((user) => {
                    assert(user.ideas[0].description === 'Idea summary');
                    done();
                });
        })

        it('can remove an idea from a user but not ideas collection', done => {
            User.findOne({ name: 'Greg' })
                .then((user) => {
                    user.ideas.pull({ _id: user.ideas[0]._id });
                    return user.save();
                })
                .then(() => User.findOne({ name: 'Greg' }))
                .then((user) => {
                    assert(user.ideas.length === 0);

                    return Idea.find({});
                })
                .then(ideas => {
                    assert(ideas.length === 1);
                    done();
                })
        })

        // ref: https://stackoverflow.com/questions/40836975/delete-documents-from-collection-and-remove-ids-from-an-array-in-another-collect?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
        xit('can remove an idea from  and all references from users', done => {
            // is this needed?
        })
    })
});