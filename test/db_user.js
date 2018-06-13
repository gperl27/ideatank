const mongoose = require('mongoose');
const User = require('../models/user');
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
});