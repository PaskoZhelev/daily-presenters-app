const connectToDatabase = require('../src/utils/database');

exports.handler = async (event) => {
    connectToDatabase().then(() => {
        console.log("Connected to the database");
        })
        .catch((err) => {
          console.log('Error occurred while connecting to the database', err);
          //process.exit();
        });

    return {
        statusCode: 200,
        body: JSON.stringify({ msg: 'Hello World' }),
    };
}