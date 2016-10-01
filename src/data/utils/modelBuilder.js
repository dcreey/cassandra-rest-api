/**
 * Created by dcreey on 9/29/2016.
 */
const createGenericModel = require('./genericModel');

function createModelBuilder(client, dataTypes) {
  return class ModelBuilder {
    constructor(modelName, properties) {
      this.modelName = modelName;
      this.properties = properties;
      this.queries = {
        getAllQuery: `SELECT * FROM ${modelName.toLowerCase()}`,
        getAllQueryParam: `SELECT * FROM ${modelName.toLowerCase()} WHERE {0}`,
        getQuery: `SELECT * FROM ${modelName.toLowerCase()} WHERE id=?`,
        updateQuery: `UPDATE ${modelName.toLowerCase()} SET {0} WHERE id=?`,
        deleteQuery: `DELETE FROM ${modelName.toLowerCase()} WHERE id=?`,
        createQuery: `INSERT INTO ${modelName.toLowerCase()} ({0}) VALUES ({1})`,
      };
    }

    getModel = function () {
      return createGenericModel(this.modelName, this.queries, this.properties, client, dataTypes);
    }
  };
}

export default createModelBuilder;
