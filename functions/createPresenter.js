const connectToDatabase = require('../src/utils/database');
const PresenterModel = require('../src/models/Presenter');

exports.handler = async (event, context, callback) => {
    const conn = await connectToDatabase().catch(err =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Error ocurred when connecting to the database'
        })
      );

    const currDate = event.queryStringParameters.date  
    const projectName = event.queryStringParameters.projectName
    const personName = event.queryStringParameters.personName

    await PresenterModel.create({ person: personName, project: projectName, date: currDate})
    .then(presenter => 
        callback(null, {
            statusCode: 200,
            body: JSON.stringify(presenter)
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