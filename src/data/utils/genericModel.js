/**
 * Created by dcreey on 9/30/2016.
 */
/* eslint-disable no-use-before-define */

import Promise from 'bluebird';
import 'proxy-polyfill';

function createGenericModel(_modelName, _properties, _genericModelService) {
  const modelName = _modelName;
  const properties = _properties;
  const genericModelService = _genericModelService;

  class Model {
    constructor(entity) {
      // convert passed entity to js object
      this.properties = properties;
      this.properties.forEach((x, i) => {
        let value = '';
        if (entity) {
          if ({}.hasOwnProperty.call(entity, x.name)) {
            // pass property through
            value = entity[x.name];
          } else if ({}.hasOwnProperty.call(entity, x.dbColumnName)) {
            // convert db object to js object
            value = entity[x.dbColumnName];
            this.properties[i].valueIsSet = true;
          }
        }
        this[x.name] = value || '';
      });
    }

    // static methods
    static getAll(searchParameters) {
      return new Promise((res) => {
        genericModelService.getAllEntities(searchParameters).then((result) => {
          if (result) {
            res(result.map(x => new ModelProxy(x)));
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
            res(result.map(x => (new ModelProxy(x)).toJson()));
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
            res(new ModelProxy(result));
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
            genericModelService.updateEntity(this, this.properties).then((updateResult) => {
              res(new ModelProxy(updateResult));
            });
          }
        });
      });
    }

    delete() {
      return new Promise((res, rej) => {
        genericModelService.deleteEntity(this).then((result) => {
          if (result) console.log(`Deleted ${modelName} with id ${result.id}`);
          res(new ModelProxy(result));
        });
      });
    }

    create() {
      return new Promise((res, rej) => {
        genericModelService.createEntity(this, this.properties).then((result) => {
          if (result) console.log(`Inserted ${modelName} with id ${result.id}`);
          res(result);
        });
      });
    }

    toJson() {
      const jsonObject = {};

      this.properties.forEach(x => {
        jsonObject[x.name] = this[x.name];
      });

      return jsonObject;
    }
  }

  // Create proxy of Model with dynamic getters and setters
  const ModelProxy = new Proxy(Model, {
    get: (target, name) => {
      if (!(name in target)) {
        return undefined;
      }
      return target[name];
    },
    set: (target, name, value) => {
      const propIndex = target.properties.findIndex(x => x.name === name);
      if (propIndex > -1) {
        target[name] = value; // eslint-disable-line no-param-reassign
        target.properties[propIndex].valueIsSet = true; // eslint-disable-line no-param-reassign
      }

      return true;
    },
  })

  // return proxy of model
  return ModelProxy;
}

export default createGenericModel;
