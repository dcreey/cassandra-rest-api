/**
 * Created by dcreey on 8/29/2016.
 */

import cassandra from 'cassandra-driver';
import dataModeler from './dataModeler';

const path = require('path');
// const fs = require('fs');

const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'testkeyspace' });
const ModelBuilder = dataModeler(client, cassandra.types);

// build database access object
const dataAccess = { cassandraClient: client };

const req = require.context('./models', true, /^((?!\.spec).)*(.js)$/);
req.keys().forEach((key) => {
  const modelName = path.basename(key, '.js');
  const model = req(key);
  dataAccess[modelName] = model(client, cassandra.types, ModelBuilder);
});

// fs
//    .readdirSync(Path.join(__dirname, 'models'))
//    .filter((file) => (file.indexOf('.') !== 0) && (file.indexOf('spec') === -1))
//    .forEach((file) => {
//      const modelPath = Path.join(__dirname, 'models', file);
//      const model = require(modelPath); // eslint-disable-line global-require
//      db[file.replace('.js', '')] = model(client, cassandra.types, Promise);
//    });

export default dataAccess;
