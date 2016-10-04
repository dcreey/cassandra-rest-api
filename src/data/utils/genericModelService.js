/**
 * Created by dcreey on 10/2/2016.
 */
/* eslint-disable no-use-before-define */

class GenericModelService {
  constructor(client, dataTypes, properties, queries) {
    this.client = client;
    this.dataTypes = dataTypes;
    this.properties = properties;
    this.queries = queries;
  }

  // class methods
  getAllEntities(searchParameters) {
    let query = this.queries.getAllQuery;
    let values = [];
    if (searchParameters) {
      const queryObject = buildQueryObject(searchParameters, this.properties, this.dataTypes);
      query = this.queries.getAllQueryParam.replace('{0}', queryObject.query);
      values = queryObject.values;
    }
    return new Promise((res, rej) => {
      this.client.execute(query, values, (err, result) => {
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

  getEntity(id) {
    return new Promise((res, rej) => {
      this.client.execute(this.queries.getQuery, [id], (err, result) => {
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

  updateEntity(entity, modifiedProps) {
    return new Promise((res, rej) => {
      const queryObject = buildQueryObject(entity, modifiedProps || this.properties, this.dataTypes);
      const query = this.queries.updateQuery.replace('{0}', queryObject.query);
      this.client.execute(query, queryObject.values, (e, result) => {
        if (e) {
          rej(e);
        } else {
          res(result);
        }
      });
    });
  }

  deleteEntity(entity) {
    return new Promise((res, rej) => {
      this.client.execute(this.queries.deleteQuery, [entity.id], (err, result) => {
        if (err) {
          rej(err);
        } else {
          res(result);
        }
      });
    });
  }

  createEntity(entity, props) {
    const entityToInsert = entity;
    entityToInsert.id = entityToInsert.id || this.dataTypes.timeuuid();
    const propIndex = this.properties.findIndex(x => x.name === 'id');
    props[propIndex].valueIsSet = true; // eslint-disable-line no-param-reassign
    return new Promise((res, rej) => {
      const queryObject = buildQueryObject(entityToInsert, this.properties, this.dataTypes, true);
      const query = this.queries.createQuery
        .replace('{0}', queryObject.query)
        .replace('{1}', queryObject.queryValue);
      this.client.execute(query, queryObject.values, (err) => {
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
      if (x.valueIsSet) {
        queryObject.values.push(tryCast(prop, x.type, dataTypes));
        queryObject.query += isCreate ? `${x.dbColumnName},` : `${x.dbColumnName}=?,`;
        queryObject.queryValue += '?,';
      }
    }
  });

  queryObject.query = queryObject.query.slice(0, -1);
  queryObject.queryValue = queryObject.queryValue.slice(0, -1);

  return queryObject;
}

function tryCast(value, type, dataTypes) {
  switch (type) {
    case 'phoneNumber':
      return parsePhoneNumber(value);
    case dataTypes.dataTypes.boolean:
      return String(value).trim().toLowerCase() === 'true';
    case dataTypes.dataTypes.decimal:
    case dataTypes.dataTypes.timeuuid:
    case dataTypes.dataTypes.text:
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

export default GenericModelService;
