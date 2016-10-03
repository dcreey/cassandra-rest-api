/**
 * Created by dcreey on 9/30/2016.
 */

import Promise from 'bluebird';

function createGenericModel(modelName, properties, genericModelService) {
  class Model {
    constructor(entity) {
      // convert passed entity to js object
      if (entity) {
        properties.forEach(x => {
          if ({}.hasOwnProperty.call(entity, x.name)) {
            // pass property through
            this[x.name] = entity[x.name] || '';
          } else if ({}.hasOwnProperty.call(entity, x.dbColumnName)) {
            // convert db object to js object
            this[x.name] = entity[x.dbColumnName] || '';
          }
        });
      }
    }

    // static methods
    static getAll(searchParameters) {
      return new Promise((res) => {
        genericModelService.getAllEntities(searchParameters).then((result) => {
          if (result) {
            res(result.map(x => new Model(x)));
          } else {
            res(null);
          }
        });
      });
    }

    static getAllJson(searchParameters) {
      return new Promise((res) => {
        genericModelService.getAllEntities(searchParameters).then((result) => {
          if (result) {
            res(result.map(x => (new Model(x)).toJson()));
          } else {
            res(null);
          }
        });
      });
    }

    static getById(id) {
      return new Promise((res) => {
        genericModelService.getEntity(id).then((result) => {
          if (result) {
            res(new Model(result));
          } else {
            res(null);
          }
        });
      });
    }

    // class methods
    update() {
      return new Promise((res, rej) => {
        genericModelService.getEntity(this.id).then((entity) => {
          if (entity) {
            genericModelService.updateEntity(this).then((updateResult) => {
              res(updateResult);
            });
          }
        });
      });
    }

    delete() {
      return new Promise((res, rej) => {
        genericModelService.deleteEntity(this).then((result) => {
          if (result) console.log(`Deleted ${modelName} with id ${result.id}`);
          res(result);
        });
      });
    }

    create() {
      return new Promise((res, rej) => {
        genericModelService.createEntity(this).then((result) => {
          if (result) console.log(`Inserted ${modelName} with id ${result.id}`);
          res(result);
        });
      });
    }

    toJson() {
      const jsonObject = {};

      properties.forEach(x => {
        jsonObject[x.name] = this[x.name];
      });

      return jsonObject;
    }
  }

  return Model;
}

export default createGenericModel;
