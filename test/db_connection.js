require('dotenv').config()
const mongoose = require('mongoose');

before(done => {
    mongoose.connect(`mongodb://${process.env.DEV_DB_USERNAME}:${process.env.DEV_DB_PASSWORD}@ds263670.mlab.com:63670/ideatank`);
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