const P = require('bluebird');
const mongoose = require('mongoose');
const path = require('path');
const environment = process.env.NODE_ENV || 'development';
const userModel = path.join(__dirname, 'entities/user/user-model');
const todoModel = path.join(__dirname, 'entities/todo/todo-model');
const db = {
  User: P.promisifyAll(require(userModel)),
  Todo: P.promisifyAll(require(todoModel)),
};

mongoose.connect(environment == 'test' ? process.env.MONGODB_TEST : process.env.MONGODB);

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
