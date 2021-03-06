const connectToDatabase = require('../src/utils/database');
const ProjectModel = require('../src/models/Project');

exports.handler = async (event, context, callback) => {
    const conn = await connectToDatabase().catch(err =>
        context.done(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Error ocurred when connecting to the database'
        })
      );

    const projectName = event.queryStringParameters.projectName
        
    await ProjectModel.findOne({ name: projectName})
    .then(projectExists => 
        context.done(null, {
            statusCode: 200,
            body: JSON.stringify(projectExists)
        })
      )
      .catch(err =>
        context.done(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'An Internal Error ocurred'
        })
      );
}