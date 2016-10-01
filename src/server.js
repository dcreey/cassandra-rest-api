/**
 * Created by dcreey on 8/30/2016.
 */
import express from 'express';
import path from 'path';
import dataAccess from './data/dataAccess';
import logger from './middleware/logger';

const fs = require('fs');

const port = process.env.PORT || '3000';

// const req = require.context('./routes', true, /index*\.(js$)[^.]*$/);
// req.keys().forEach((key) => {
//  const version = key.split(path.posix.sep)[1];
//  if (routeArray.routes[version]) {
//    routeArray.routes[version].push(req(key));
//  } else {
//    routeArray.versions.push(version);
//    routeArray.routes[version] = [req(key)];
//  }
//  console.log(`API Version ${version} Registered`);
// });



// create express app
const app = express();

// register request logger
app.use(logger.routeLogger);

// register all api routes
fs
  .readdirSync(path.join(__dirname, 'routes'))
  .filter((file) => (file.indexOf('.') !== 0) && (file.indexOf('spec') === -1))
  .forEach((version) => {
    const versionPath = path.join(__dirname, 'routes', version);
    const router = new express.Router();
    router.get('/error', (req, res, next) =>
      // here we cause an error in the pipeline so we see express-winston in action.
      next(new Error('This is an error and it should be logged to the console'))
    );
    fs.readdirSync(versionPath)
      .forEach((r) => {
        const route = require(path.join(versionPath, r)); // eslint-disable-line global-require
        route(router, dataAccess);
      });
    app.use(`/${version}`, router);
  });

// routeArray.versions.forEach((version) => {
//  const router = new express.Router();
//  router.get('/error', (req, res, next) =>
//    // here we cause an error in the pipeline so we see express-winston in action.
//    next(new Error('This is an error and it should be logged to the console'))
//  );
//  routeArray.routes[version].forEach((route) => {
//    route(router, dataAccess);
//  });
//  app.use(`/${version}`, router);
// });

// register error logger
app.use(logger.errorLogger);

app.listen(port, () => {
  const message = `express-winston demo listening on port = ${port}
                   in ${app.settings.env} mode`;
  console.log(message);
});

