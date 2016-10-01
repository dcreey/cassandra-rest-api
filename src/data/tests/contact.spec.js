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

const contacts = [
  { id: '111', first_name: 'first', last_name: 'first', email: 'jamesF@cql.com', phone: '9998883333' },
  { id: '112', first_name: 'second', last_name: 'second', email: 'jamesS@cql.com', phone: '8887772222' },
  { id: '113', first_name: 'last', last_name: 'last', email: 'jamesL@cql.com', phone: '7776661111' },
];

const client = { execute: (query, values, cb) => {} };

describe('test database access object', function () {
  describe('test getAll contacts', function () {
    it('Should return list of Contact Models', function (done) {
      client.execute = (query, values, cb) => { cb(null, contacts); };
      contactModel(client, types, Promise).getAll().then((results) => {
        assert.ok(results);
        done();
      });
    });
    it('Should return rejection when no contacts found', function (done) {
      client.execute = (query, values, cb) => { cb(null, null); };
      contactModel(client, types, Promise).getAll().then((results) => {
        assert.ok(results == null);
        done();
      });
    });
  });

  describe('test create contact', function () {
    it('Should return contact', function (done) {
      client.execute = (query, values, cb) => { cb(null, contacts[0]); };
      new contactModel(client, types, Promise)().create().then((results) => {
        assert.ok(results);
        done();
      });
    });
    it('Should return rejection when no contacts found', function (done) {
      client.execute = (query, values, cb) => { cb(null, null); };
      contactModel(client, types, Promise).getAll().then((results) => {
        assert.ok(results == null);
        done();
      });
    });
  });

  it('Should create a contact successfully', function (done) {
    db.contact.createContact(contact).then((c) => {
      contact.id = c.id;
      assert.ok(contact.id);
      done();
    });
  });

  it('Should get a contact successfully', function (done) {
    db.contact.getById(contact.id, contact).then((c) => {
      assert.ok(c.email === contact.email);
      done();
    });
  });

  it('Should update a contact successfully', function (done) {
    contact.email = 'lastname@gmail.com';
    db.contact.updateById(contact.id, contact).then((result) => {
      assert.ok(result);
      done();
    });
  });

  it('Should update a contact successfully', function (done) {
    contact.email = 'lastname@gmail.com';
    db.contact.deleteById(contact.id).then((result) => {
      assert.ok(result);
      done();
    });
  });

  it('Should return no contact', function (done) {
    db.contact.getById(contact.id, contact).then((c) => {
      assert.ok(c === null);
      done();
    });
  });
});
