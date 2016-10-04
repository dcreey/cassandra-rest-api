/**
 * Created by dcreey on 9/3/2016.
 */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */

const assert = require('assert');
const Promise = require('bluebird');
const types = require('cassandra-driver').types;
const contactModel = require('../models/contact');

const contacts = { rows: [
  { id: '111', first_name: 'first', last_name: 'first', email: 'jamesF@cql.com', phone: '9998883333' },
  { id: '112', first_name: 'second', last_name: 'second', email: 'jamesS@cql.com', phone: '8887772222' },
  { id: '113', first_name: 'last', last_name: 'last', email: 'jamesL@cql.com', phone: '7776661111' },
] };
const client = { execute: (query, values, cb) => {} };

const ModelBuilder = class ModelBuilder { getModel() {
  return class Model {
    static getAll() {}
    update() {}
  };
}};

describe('test database access object', function () {
  describe('test get contact by email', function () {
    it('Should return contact model with getAll and getByEmail static methods', function (done) {
      const Contact = contactModel(client, types, ModelBuilder);
      assert.ok(Contact.getByEmail);
      assert.ok(Contact.getAll);
      done();
    });
    it('Should return contact by email', function (done) {
      client.execute = (query, values, cb) => { cb(null, { rows: [contacts.rows[0]] }); };
      const Contact = contactModel(client, types, ModelBuilder);
      Contact.getByEmail().then((results) => {
        assert.ok(results);
        done();
      });
    });
  });
});
