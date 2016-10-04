/**
 * Created by dcreey on 9/30/2016.
 */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable max-len */

const assert = require('assert');
const cassandra = require('cassandra-driver');
const createGenericModel = require('../utils/genericModel');

const genericModelService = {
  getAllEntities: () => null,
  getEntity: () => null,
  updateEntity: () => null,
  deleteEntity: () => null,
  createEntity: () => null,
};

const modelName = 'MockEntity';
const types = cassandra.types;
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

describe('test generic model class with mock entity', function () {
  describe('test getAll mock entities', function () {
    it('Should return list of entities and map to js model', function (done) {
      genericModelService.getAllEntities = () => new Promise((res) => { res(dbEntities.rows); });
      const MockEntity = createGenericModel(modelName, properties, genericModelService);
      MockEntity.getAll().then((results) => {
        assert.ok(results);
        results.forEach((x, i) => assert.deepEqual(x.toJson(), entities[i]));
        done();
      });
    });
    it('Should return null when no contacts found', function (done) {
      genericModelService.getAllEntities = () => new Promise((res) => { res(null); });
      const MockEntity = createGenericModel(modelName, properties, genericModelService);
      MockEntity.getAll().then((results) => {
        assert.ok(results == null);
        done();
      });
    });
    it('Should return list of json entities', function (done) {
      genericModelService.getAllEntities = () => new Promise((res) => { res(dbEntities.rows); });
      const MockEntity = createGenericModel(modelName, properties, genericModelService);
      MockEntity.getAllJson().then((results) => {
        assert.ok(results);
        results.forEach((x, i) => assert.deepEqual(x, entities[i]));
        done();
      });
    });
    it('Should return null when no contacts found', function (done) {
      genericModelService.getAllEntities = () => new Promise((res) => { res(null); });
      const MockEntity = createGenericModel(modelName, properties, genericModelService);
      MockEntity.getAllJson().then((results) => {
        assert.ok(results == null);
        done();
      });
    });
  });

  describe('test get mock entity by id', function () {
    it('Should return entity and map to js model', function (done) {
      genericModelService.getEntity = () => new Promise((res) => { res(dbEntities.rows[0]); });
      const MockEntity = createGenericModel(modelName, properties, genericModelService);
      MockEntity.getById().then((entity) => {
        assert.deepEqual(entity.toJson(), entities[0]);
        done();
      });
    });
    it('Should return null when no contact found', function (done) {
      genericModelService.getEntity = () => new Promise((res) => { res(null); });
      const MockEntity = createGenericModel(modelName, properties, genericModelService);
      MockEntity.getById().then((entity) => {
        assert.ok(entity == null);
        done();
      });
    });
  });

  describe('should create a new entity with passed entity property values', function () {
    it('Model passed entity property values should have those values', function (done) {
      const MockEntity = createGenericModel(modelName, properties, genericModelService);
      const entity = new MockEntity(entities[0]);
      assert(entity.id === entities[0].id);
      assert(entity.companyName === entities[0].companyName);
      done();
    });
    it('Model passed null should have model properties', function (done) {
      const MockEntity = createGenericModel(modelName, properties, genericModelService);
      const entity = new MockEntity();
      assert({}.hasOwnProperty.call(entity, 'id'));
      assert({}.hasOwnProperty.call(entity, 'companyName'));
      done();
    });
  });

  describe('test update mock entity', function () {
    it('Should return updated entity with property valueIsSet value of true for companyName property', function (done) {
      const updatedEntity = entities[0];
      updatedEntity.companyName = 'NewCompanyName';
      genericModelService.getEntity = () => new Promise((res) => { res(dbEntities.rows[0]); });
      genericModelService.updateEntity = (uEntity, props) => new Promise((res) => {
        const propIndex = props.findIndex(x => x.name === 'companyName');
        assert(props[propIndex].valueIsSet);
        res(uEntity);
      });
      const MockEntity = createGenericModel(modelName, properties, genericModelService);
      const entity = new MockEntity(entities[0]);
      entity.companyName = 'NewCompanyName';
      entity.update().then((uEntity) => {
        assert(uEntity.companyName === updatedEntity.companyName);
        done();
      });
    });
  });

  describe('test delete mock entity', function () {
    it('Should return deleted entity', function (done) {
      genericModelService.getEntity = () => new Promise((res) => { res(dbEntities.rows[0]); });
      genericModelService.deleteEntity = (uEntity) => new Promise((res) => {
        res(uEntity);
      });
      const MockEntity = createGenericModel(modelName, properties, genericModelService);
      const entity = new MockEntity(entities[0]);
      entity.companyName = 'NewCompanyName';
      entity.delete().then((uEntity) => {
        assert.deepEqual(uEntity.toJson(), entities[0]);
        done();
      });
    });
  });

  describe('test create mock entity', function () {
    it('Should return updated entity', function (done) {
      genericModelService.getEntity = () => new Promise((res) => { res(dbEntities.rows[0]); });
      genericModelService.createEntity = (uEntity) => new Promise((res) => {
        res(uEntity);
      });
      const MockEntity = createGenericModel(modelName, properties, genericModelService);
      const entity = new MockEntity(entities[0]);
      entity.create().then((uEntity) => {
        assert.deepEqual(uEntity.toJson(), entities[0]);
        done();
      });
    });
  });
});
