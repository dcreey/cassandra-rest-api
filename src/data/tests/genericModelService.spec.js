/**
 * Created by dcreey on 9/30/2016.
 */
/* eslint-disable prefer-arrow-callback */




//////////////
//////////////
//////////////



const assert = require('assert');
const cassandra = require('cassandra-driver');
const createGenericModel = require('../utils/genericModel');
const genericModelService = require('../utils/genericModelService');

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
  { name: 'id', dbColumnName: 'id', type: types.timeuuid },
  { name: 'companyName', dbColumnName: 'company_name', type: types.string },
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

describe('test generic model class with mock entity', function () {
  describe('test getAll mock entities', function () {
    it('Should return list of entities and map to js model', function (done) {
      client.execute = (query, values, cb) => { cb(null, dbEntities); };
      const MockEntity = createGenericModel(modelName, queries, properties, client, types);
      MockEntity.getAll().then((results) => {
        assert.ok(results);
        results.forEach((x, i) => assert.deepEqual(x.toJson(), entities[i]));
        done();
      });
    });
    it('Should return null when no contacts found', function (done) {
      client.execute = (query, values, cb) => { cb(null, null); };
      const MockEntity = createGenericModel(modelName, queries, properties, client, types);
      MockEntity.getAll().then((results) => {
        assert.ok(results == null);
        done();
      });
    });
    it('Should return list of json entities', function (done) {
      client.execute = (query, values, cb) => { cb(null, dbEntities); };
      const MockEntity = createGenericModel(modelName, queries, properties, client, types);
      MockEntity.getAllJson().then((results) => {
        assert.ok(results);
        results.forEach((x, i) => assert.deepEqual(x, entities[i]));
        done();
      });
    });
  });

  describe('test get mock entity by id', function () {
    it('Should return entity and map to js model', function (done) {
      client.execute = (query, values, cb) => { cb(null, { rows: [dbEntities.rows[0]] }); };
      const MockEntity = createGenericModel(modelName, queries, properties, client, types);
      MockEntity.getById().then((entity) => {
        assert.deepEqual(entity.toJson(), entities[0])
        done();
      });
    });
    it('Should return null when no contact found', function (done) {
      client.execute = (query, values, cb) => { cb(null, null); };
      const MockEntity = createGenericModel(modelName, queries, properties, client, types);
      MockEntity.getById().then((entity) => {
        assert.ok(entity == null);
        done();
      });
    });
  });

  describe('test update mock entity by id', function () {
    it('Should return entity with update function', function (done) {
      client.execute = (query, values, cb) => { cb(null, { rows: [dbEntities.rows[0]] }); };
      const MockEntity = createGenericModel(modelName, queries, properties, client, types);
      MockEntity.getById().then((entity) => {
        assert.ok(entity.update);
        done();
      });
    });
    it('Should pass array of parameters to update to execute method', function (done) {
      client.execute = (query, values, cb) => {
        cb(null, null);
      };
      const MockEntity = createGenericModel(modelName, queries, properties, client, types);
      MockEntity.getById().then((entity) => {
        client.prototype.execute = (query, values, cb) => {
          cb(null, null);
        };
        assert.ok(entity == null);
        done();
      });
    });
  });
});
