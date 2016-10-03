/**
 * Created by dcreey on 10/2/2016.
 */
/* eslint-disable no-use-before-define */

function genericModelService(client, dataTypes, properties, queries) {
  function getAllEntities(searchParameters) {
    let query = queries.getAllQuery;
    let values = [];
    if (searchParameters) {
      const queryObject = buildQueryObject(searchParameters, properties, dataTypes);
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
          res(result.rows);
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
          res(result.rows[0]);
        }
      });
    });
  }

  function updateEntity(entity) {
    return new Promise((res, rej) => {
      const queryObject = buildQueryObject(entity, properties, dataTypes);
      const query = queries.updateQuery.replace('{0}', queryObject.query);
      client.execute(query, queryObject.values, (e, result) => {
        if (e) {
          rej(e);
        } else {
          res(result);
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
          res(result);
        }
      });
    });
  }

  function createEntity(entity) {
    const entityToInsert = entity;
    entityToInsert.id = entityToInsert.id || dataTypes.timeuuid();
    return new Promise((res, rej) => {
      const queryObject = buildQueryObject(entityToInsert, properties, dataTypes, true);
      const query = queries.createQuery
        .replace('{0}', queryObject.query)
        .replace('{1}', queryObject.queryValue);
      client.execute(query, queryObject.values, (err) => {
        if (err) {
          rej(err);
        } else {
          res(entity);
        }
      });
    });
  }
}

function buildQueryObject(entity, properties, dataTypes, isCreate = false) {
  const queryObject = {
    query: '',
    queryValue: '',
    values: [],
  };
  properties.forEach(x => {
    if ({}.hasOwnProperty.call(entity, x.name)) {
      const prop = entity[x.name];
      queryObject.values.push(tryCast(prop, x.type, dataTypes));
      queryObject.query += isCreate ? `${x.dbColumnName},` : `${x.dbColumnName}=?,`;
      queryObject.queryValue += '?,';
    }
  });

  queryObject.query = queryObject.query.slice(0, -1);
  queryObject.queryValue = queryObject.queryValue.slice(0, -1);

  return queryObject;
}

function tryCast(value, type, dataTypes) {
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

function parsePhoneNumber(number) {
  const num = number.trim()
    .replace(' ', '')
    .replace('-', '')
    .replace('(', '')
    .replace(')', '');
  return parseInt(num, 10);
}

export default genericModelService;
