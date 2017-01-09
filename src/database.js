const Promise = require('bluebird');
const mongoose = require('mongoose');
const path = require('path');
const DB_URI = getDatabaseURI();

const db = {
  User: Promise.promisifyAll(require(path.join(__dirname, 'entities/user/user-model'))),
  Todo: Promise.promisifyAll(require(path.join(__dirname, 'entities/todo/todo-model'))),
};

// connect to the database
mongoose.connect(DB_URI);

/**
 *
 * When the database is ready, log it!
 *
 */
function onDatabaseConnection() {
  console.log('Database connection is open!');
}

/**
 *
 * When the database is disconnected, log it!
 *
 */
function onDatabaseDisconnection() {
  console.log('Database connection is lost');
}

/**
 *
 * When the database has an error, log it!
 *
 */
function onDatabaseError(err) {
  console.log(`Database connection has an error: ${err}`);
}

/**
 *
 * Get the DB_URI based on NODE_ENV
 *
 */
function getDatabaseURI() {
  return process.env.MONGODB;
    // return 'mongodb://' + (process.env.MONGO_1_PORT_27017_TCP_ADDR || '127.0.0.1') + '/dbHapiTest'; //process.env.NODE_ENV === 'test' ? 'mongodb://localhost/dbHapiTest' : process.env.DB_URI;
}

db.database = mongoose.connection;

db.database.on('connected', onDatabaseConnection);
db.database.on('disconnected', onDatabaseDisconnection);
db.database.on('error', onDatabaseError);

module.exports = db;
