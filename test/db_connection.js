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
    const { users } = mongoose.connection.collections;
    users.drop(() => {
        done();
    });
});