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
    const date = event.queryStringParameters.date

    const filter = { name: projectName.toUpperCase() };
    const update = { lastGeneratedDate: date };    

    await ProjectModel.findOneAndUpdate(filter, update)
    .then(project => 
        context.done(null, {
            statusCode: 200,
            body: JSON.stringify(project)
        })
      )
      .catch(err =>
        context.done(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: err
        })
      );
}