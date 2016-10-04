/**
 * Created by dcreey on 9/30/2016.
 */
/* eslint-disable prefer-arrow-callback */

const assert = require('assert');
const cassandra = require('cassandra-driver');
const createGenericModel = require('../utils/genericModel');
const GenericModelService = require('../utils/genericModelService');

const modelName = 'MockEntity';
const queries = {
  getAllQuery: `SELECT * FROM ${modelName.toLowerCase()}`,
  getAllQueryParam: `SELECT * FROM ${modelName.toLowerCase()} WHERE {0}`,
  getQuery: `SELECT * FROM ${modelName.toLowerCase()} WHERE id=?`,
  updateQuery: `UPDATE ${modelName.toLowerCase()} SET {0} WHERE id=?`,
  deleteQuery: `DELETE FROM ${modelName.toLowerCase()} WHERE id=?`,
  createQuery: `INSERT INTO ${modelName.toLowerCase()} ({0}) VALUES ({1})`,
};
const types = cassandra.types;
const client = { execute: (query, values, cb) => {} };
const properties = [
  { name: 'id', dbColumnName: 'id', type: types.dataTypes.timeuuid },
  { name: 'companyName', dbColumnName: 'company_name', type: types.dataTypes.text },
];
const entities = [
  { id: types.timeuuid(), companyName: 'Company1' },
  { id: types.timeuuid(), companyName: 'Company2' },
];
const dbEntities = {
  rows: [
    { id: entities[0].id, company_name: 'Company1' },
    { id: entities[1].id, company_name: 'Company2' },
  ],
};

describe('test generic model service with mock entity', function () {
  describe('test getAll mock entities', function () {
    it('Should return list of entities', function (done) {
      client.execute = (query, values, cb) => { cb(null, dbEntities); };
      const service = new GenericModelService(client, types, properties, queries);
      service.getAllEntities().then((results) => {
        assert.ok(results);
        results.forEach((x, i) => {
          assert.equal(x.company_name, entities[i].companyName);
          assert.equal(x.id, entities[i].id);
        });
        done();
      });
    });
    it('Should return null when no contacts found', function (done) {
      client.execute = (query, values, cb) => { cb(null, null); };
      const service = new GenericModelService(client, types, properties, queries);
      service.getAllEntities().then((results) => {
        assert.ok(results == null);
        done();
      });
    });
  });

  describe('test get mock entity by id', function () {
    it('Should return entity and map to js model', function (done) {
      client.execute = (query, values, cb) => { cb(null, { rows: [dbEntities.rows[0]] }); };
      const service = new GenericModelService(client, types, properties, queries);
      service.getEntity().then((entity) => {
        assert.equal(entity.id, entities[0].id);
        assert.equal(entity.company_name, entities[0].companyName);
        done();
      });
    });
    it('Should return null when no contact found', function (done) {
      client.execute = (query, values, cb) => { cb(null, null); };
      const service = new GenericModelService(client, types, properties, queries);
      service.getEntity().then((entity) => {
        assert.ok(entity == null);
        done();
      });
    });
  });

  describe('test update mock entity ', function () {
    it('Should return entity with update function', function (done) {
      const updatedEntity = entities[0];
      const props = properties;
      updatedEntity.companyName = 'NewCompanyName';
      props[1].valueIsSet = true;
      client.execute = (query, values, cb) => {
        assert.equal(values[0], updatedEntity.companyName);
        cb(null, { rows: [] });
      };
      const service = new GenericModelService(client, types, properties, queries);
      service.updateEntity(updatedEntity, props).then(() => {
        done();
      });
    });
  });

  describe('test delete mock entity', function () {
    it('Should return entity with update function', function (done) {
      client.execute = (query, values, cb) => {
        assert.equal(values[0], entities[0].id);
        cb(null, { rows: [] });
      };
      const service = new GenericModelService(client, types, properties, queries);
      service.deleteEntity(entities[0]).then(() => {
        done();
      });
    });
  });

  describe('test create mock entity ', function () {
    it('Should return entity with update function', function (done) {
      const props = properties;
      props[1].valueIsSet = true;
      client.execute = (query, values, cb) => {
        properties.forEach((x, i) => {
          assert.equal(values[i], entities[0][x.name]);
        });
        cb(null, { rows: [] });
      };
      const service = new GenericModelService(client, types, properties, queries);
      service.createEntity(entities[0], props).then(() => {
        done();
      });
    });
  });
});
