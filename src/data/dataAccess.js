/**
 * Created by dcreey on 8/29/2016.
 */

import cassandra from 'cassandra-driver';
import createModelBuilder from './utils/modelBuilder';

const path = require('path');
const fs = require('fs');

const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'testkeyspace' });
const ModelBuilder = createModelBuilder(client, cassandra.types);

// build database access object
const dataAccess = { cassandraClient: client };

// const req = require.context('./models', true, /^((?!\.spec).)*(.js)$/);
// req.keys().forEach((key) => {
//  const modelName = path.basename(key, '.js');
//  const model = req(key);
//  dataAccess[modelName] = model(client, cassandra.types, ModelBuilder);
// });

fs
  .readdirSync(path.join(__dirname, 'models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file.indexOf('spec') === -1))
  .forEach((file) => {
    const modelName = path.basename(file, '.js');
    const modelPath = path.join(__dirname, 'models', file);
    console.log(modelPath);
    const model = require(modelPath); // eslint-disable-line global-require
    dataAccess[modelName] = model(client, cassandra.types, ModelBuilder);
  });

export default dataAccess;
