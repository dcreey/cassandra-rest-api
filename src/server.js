/**
 * Created by dcreey on 8/30/2016.
 */
import express from 'express';
// import path from 'path';
import dataAccess from './data/dataAccess';
import logger from './middleware/logger';
import registerVersions from './routes/registerVersions';

// const fs = require('fs');

const port = process.env.PORT || '3000';

const app = express();

// register request logger
app.use(logger.routeLogger);

// register all api routes
registerVersions(app, dataAccess, express);

// register error logger
app.use(logger.errorLogger);

app.listen(port, () => {
  const message = `express-winston demo listening on port = ${port}
                   in ${app.settings.env} mode`;
  console.log(message);
});

