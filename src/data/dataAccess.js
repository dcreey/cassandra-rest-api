/**
 * Created by dcreey on 8/29/2016.
 */

import cassandra from 'cassandra-driver';
import createModelBuilder from './utils/modelBuilder';

// import models
import contactModel from './models/contact';

const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'testkeyspace' });
const ModelBuilder = createModelBuilder(client, cassandra.types);

// build database access object
const dataAccess = {
  cassandraClient: client,
  Contact: contactModel(client, cassandra.types, ModelBuilder),
};

export default dataAccess;
