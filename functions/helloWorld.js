const connectToDatabase = require('../src/utils/database');
const PersonModel = require('../src/models/Person');
const ProjectModel = require('../src/models/Project');

exports.handler = async (event) => {
    connectToDatabase().then(() => {
        ProjectModel.find({ name: 'CE-Phoenix'}, function (err, project) {
            if (err){
                console.log(err);
            }
            else{
                console.log("Success : ", project);
            }
        });

        // PersonModel.create({
        //     name: 'Pasko Zhelev',
        //     project: 'CE-Phoenix',
        //   }, (err) => {
        //     if (err) {
        //       console.err('Error occurred while adding person to the db');
        //       console.err(err.message);
        //     }
        //   });

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