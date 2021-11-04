const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
let isConnected;

const connectToDatabase = () => {
    if (isConnected) {
      console.log('=> using existing database connection');
      return Promise.resolve();
    }
    console.log('=> using new database connection');
    return mongoose.connect(process.env.MONGO_URL).then(db => {
      isConnected = db.connections[0].readyState;
    });
};

module.exports = connectToDatabase;