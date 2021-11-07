const connectToDatabase = require('../src/utils/database');
const PersonModel = require('../src/models/Person');

exports.handler = async (event, context, callback) => {
    const conn = await connectToDatabase().catch(err =>
        context.done(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Error ocurred when connecting to the database'
        })
      );

    const projectName = event.queryStringParameters.projectName

    await PersonModel.find({ project: projectName})
    .then(person => 
        context.done(null, {
            statusCode: 200,
            body: JSON.stringify(person)
        })
      )
      .catch(err =>
        context.done(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'An Error ocurred when creating a person'
        })
      );
}