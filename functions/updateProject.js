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
    let currentPresenterIndex = event.queryStringParameters.currentPresenterIndex
    const peopleCount = event.queryStringParameters.peopleCount
    const filter = { name: projectName.toUpperCase() };
    let update;  

    if(date !== undefined) {
      update = { lastGeneratedDate: date };  
    } else if(currentPresenterIndex !== undefined && peopleCount !== undefined) {
      currentPresenterIndex++;
      if(currentPresenterIndex >= peopleCount) {
        currentPresenterIndex = 0;
      }

      update = { indexOfNextPresenter: currentPresenterIndex };  
    }

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