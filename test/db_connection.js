const mongoose = require('mongoose');

before(done => {
    mongoose.connect('mongodb://localhost/ideatank');
    mongoose.connection
        .once('open', () => { done(); })
        .on('error', (error) => {
            console.warn('Warning', error);
        });
});

beforeEach((done) => {
    const { users, ideas, thoughts } = mongoose.connection.collections;


    users.drop(() => {
        ideas.drop(() => {
            thoughts.drop(() => done())
        })
    });
});