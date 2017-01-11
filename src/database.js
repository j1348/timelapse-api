const Promise = require('bluebird');
const mongoose = require('mongoose');
const path = require('path');

const db = {
  User: Promise.promisifyAll(require(path.join(__dirname, 'entities/user/user-model'))),
  Todo: Promise.promisifyAll(require(path.join(__dirname, 'entities/todo/todo-model'))),
};

// connect to the database
mongoose.connect(process.env.MONGODB);

function onDatabaseConnection() {
  console.log('Database connection is open!');
}

function onDatabaseDisconnection() {
  console.log('Database connection is lost');
}

function onDatabaseError(err) {
  console.log(`Database connection has an error: ${err}`);
}

db.database = mongoose.connection;

db.database.on('connected', onDatabaseConnection);
db.database.on('disconnected', onDatabaseDisconnection);
db.database.on('error', onDatabaseError);

module.exports = db;
