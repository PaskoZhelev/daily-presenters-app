const connectToDatabase = require('../src/utils/database');
const PersonModel = require('../src/models/Person');

exports.handler = async (event, context, callback) => {
    const conn = await connectToDatabase().catch(err =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Error ocurred when connecting to the database'
        })
      );

    const projectName = event.queryStringParameters.projectName
    const personName = event.queryStringParameters.personName

    await PersonModel.deleteMany({ name: personName, project: projectName})
    .then(person => 
        callback(null, {
            statusCode: 200,
            body: JSON.stringify(person)
        })
      )
      .catch(err =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'An Error ocurred when creating a person'
        })
      );
}