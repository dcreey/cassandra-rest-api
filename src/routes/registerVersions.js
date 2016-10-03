/**
 * Created by dcreey on 10/2/2016.
 */

const apiV1 = require('./v1/registerRoutes');

function registerVersions(app, dataAccess, express) {
  const apiV1Router = new express.Router();
  apiV1(apiV1Router, dataAccess);

  app.use('/v1', apiV1Router);
}

export default registerVersions;
