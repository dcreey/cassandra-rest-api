/**
 * Created by dcreey on 9/29/2016.
 */
const createGenericModel = require('./genericModel');
const modelService = require('./genericModelService');

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

    getModel() {
      const service = modelService(client, dataTypes, this.properties, this.queries);
      return createGenericModel(this.modelName, this.properties, service);
    }
  };
}

export default createModelBuilder;
