const connectToDatabase = require('../src/utils/database');
const PresenterModel = require('../src/models/Presenter');

exports.handler = async (event, context, callback) => {
    const conn = await connectToDatabase().catch(err =>
        context.done(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Error ocurred when connecting to the database'
        })
      );

    const currDate = event.queryStringParameters.date  
    const projectName = event.queryStringParameters.projectName
    const currDateConverted = new Date(currDate)
    const convertedDate = Date.UTC(currDateConverted.getFullYear(), currDateConverted.getMonth(), currDateConverted.getDate())

    await PresenterModel.find({ project: projectName, date: {$gte: convertedDate}}).sort({ date: 1}).limit(35)
    .then(presenter => 
        context.done(null, {
            statusCode: 200,
            body: JSON.stringify(presenter)
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