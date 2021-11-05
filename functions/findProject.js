const connectToDatabase = require('../src/utils/database');
const ProjectModel = require('../src/models/Project');

exports.handler = async (event) => {
    connectToDatabase().then(() => {
            ProjectModel.exists({ name: 'CE-Phoenix'}, function (err, project) {
                if (err){
                    console.log(err);
                }
                else{
                    console.log("Exists : ", project);
                }
            });
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