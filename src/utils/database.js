const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
let isConnected;

const connectToDatabase = () => {
    if (isConnected) {
      console.log('Using Existing database connection');
      return Promise.resolve();
    }
    console.log('Established database connection');
    return mongoose.connect(process.env.MONGO_URL).then(db => {
      isConnected = db.connections[0].readyState;
    });
};

module.exports = connectToDatabase;