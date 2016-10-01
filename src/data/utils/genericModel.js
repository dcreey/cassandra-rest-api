/**
 * Created by dcreey on 9/30/2016.
 */
/* eslint-disable no-use-before-define */

import Promise from 'bluebird';

function createGenericModel(modelName, queries, properties, client, dataTypes) {
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
      return getAllEntities(searchParameters); // eslint-disable-line no-use-before-define
    }

    static getAllJson(searchParameters) {
      return new Promise((res) => {
        getAllEntities(searchParameters).then((result) => {
          if (result) {
            res(result.map(x => x.toJson()));
          } else {
            res(null);
          }
        });
      });
    }

    static getById(id) {
      return getEntity(id);
    }

    // class methods
    update() {
      return updateEntity(this);
    }

    delete() {
      return deleteEntity(this);
    }

    create() {
      return createEntity(this);
    }

    toJson() {
      const jsonObject = {};

      properties.forEach(x => {
        jsonObject[x.name] = this[x.name];
      });

      return jsonObject;
    }
  }

  function tryCast(value, type) {
    switch (type) {
      case dataTypes.boolean:
        return String(value).trim().toLowerCase() === 'true';
      case dataTypes.phoneNumber:
        return parsePhoneNumber(value);
      case dataTypes.money:
      case dataTypes.timeuuid:
      case dataTypes.string:
      default:
        return String(value).trim();
    }
  }

  function buildQueryObject(entity, isCreate = false) {
    const queryObject = {
      query: '',
      queryValue: '',
      values: [],
    };
    properties.forEach(x => {
      if ({}.hasOwnProperty.call(entity, x.name)) {
        const prop = entity[x.name];
        queryObject.values.push(tryCast(prop, x.type));
        queryObject.query += isCreate ? `${x.dbColumnName},` : `${x.dbColumnName}=?,`;
        queryObject.queryValue += '?,';
      }
    });

    queryObject.query = queryObject.query.slice(0, -1);
    queryObject.queryValue = queryObject.queryValue.slice(0, -1);

    return queryObject;
  }

  function getAllEntities(searchParameters) {
    let query = queries.getAllQuery;
    let values = [];
    if (searchParameters) {
      const queryObject = buildQueryObject(searchParameters);
      query = queries.getAllQueryParam.replace('{0}', queryObject.query);
      values = queryObject.values;
    }
    return new Promise((res, rej) => {
      client.execute(query, values, (err, result) => {
        if (err) {
          rej(err);
        } else if (!result) {
          res(null);
        } else if (result.rows.length === 0) {
          res(null);
        } else {
          res(result.rows.map(x => new Model(x)));
        }
      });
    });
  }

  function getEntity(id) {
    return new Promise((res, rej) => {
      client.execute(queries.getQuery, [id], (err, result) => {
        if (err) {
          rej(err);
        } else if (!result) {
          res(null);
        } else if (result.rows.length === 0) {
          res(null);
        } else {
          res(new Model(result.rows[0]));
        }
      });
    });
  }

  function updateEntity(entity) {
    return new Promise((res, rej) => {
      client.execute(queries.getQuery, [entity.id], (err, entityInDb) => {
        if (err) {
          rej(err);
        } else {
          const queryObject = buildQueryObject(entity);
          const query = queries.updateQuery.replace('{0}', queryObject.query);
          client.execute(query, queryObject.values, (e, result) => {
            if (e) {
              rej(e);
            } else {
              res(result);
            }
          });
        }
      });
    });
  }

  function deleteEntity(entity) {
    return new Promise((res, rej) => {
      client.execute(queries.deleteQuery, [entity.id], (err, result) => {
        if (err) {
          rej(err);
        } else {
          console.log(`Deleted ${modelName} with id ${entity.id}`);
          res(result);
        }
      });
    });
  }

  function createEntity(entity) {
    const entityToInsert = entity;
    entityToInsert.id = entityToInsert.id || dataTypes.timeuuid();
    return new Promise((res, rej) => {
      const queryObject = buildQueryObject(entityToInsert, true);
      const query = queries.createQuery
        .replace('{0}', queryObject.query)
        .replace('{1}', queryObject.queryValue);
      client.execute(query, queryObject.values, (err) => {
        if (err) {
          rej(err);
        } else {
          console.log(`Inserted ${modelName} with id ${entity.id}`);
          res(entity);
        }
      });
    });
  }
  return Model;
}

function parsePhoneNumber(number) {
  const num = number.trim()
    .replace(' ', '')
    .replace('-', '')
    .replace('(', '')
    .replace(')', '');
  return parseInt(num, 10);
}

export default createGenericModel;
