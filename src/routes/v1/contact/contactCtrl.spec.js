/**
 * Created by dcreey on 8/30/2016.
 * Test Contact Business Logic
 */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable max-len */

const assert = require('assert');
const contactCtrl = require('./contactCtrl');

const db = { contact: function () {
  function getById() { return null; }
  return { getById };
} };

const contacts = [
  { id: '111', first_name: 'first', last_name: 'first', email: 'jamesF@cql.com', phone: '9998883333' },
  { id: '112', first_name: 'second', last_name: 'second', email: 'jamesS@cql.com', phone: '8887772222' },
  { id: '113', first_name: 'last', last_name: 'last', email: 'jamesL@cql.com', phone: '7776661111' },
];

const req = {
  params: {
    contact_id: '111',
  },
};

const res = {
  json: () => null,
  status: () => null,
};

describe('Contact Controller Tests', function () {
  describe('Get All Contacts Tests', function () {
    it('should get a list of contacts', (done) => {
      db.Contact.prototype.getAll = () => contacts;
      res.json = (json) => {
        assert(json === contacts);
        done();
      };
      contactCtrl(db).getAll(null, res, null);
    });

    it('should return 404 when no contacts found', (done) => {
      db.Contact.prototype.getAll = () => null;
      res.status = (status) => {
        assert(status === 404);
        return { json: () => done() };
      };
      contactCtrl(db).getAll(null, res, null);
    });
  });

  describe('Insert contact tests', function () {
    it('should insert a contact', (done) => {
      db.Contact.prototype.getById = () => null;
      db.Contact.prototype.create = () => contacts[2];
      res.json = (json) => {
        assert(json === contacts[2]);
        done();
      };
      contactCtrl(db).createContact(req, res, null);
    });

    it('should return conflict status when contact exists', (done) => {
      db.Contact.prototype.getById = () => contacts[2];
      res.status = (code) => {
        assert(code === 409);
        return { json: () => done() };
      };
      contactCtrl(db).createContact(req, res, null);
    });
  });

  describe('Insert contact tests', function () {
    it('should get a specific contact', (done) => {
      res.json = (json) => {
        assert(json === contacts[0]);
        done();
      };
      db.Contact.prototype.getById = () => contacts[0];
      contactCtrl(db).getContact(req, res, null);
    });

    it('should return 404 when contact not found', (done) => {
      res.status = (code) => {
        assert(code === 404);
        return { json: () => done() };
      };
      db.Contact.prototype.getById = () => null;
      contactCtrl(db).getContact(req, res, null);
    });
  });

  describe('Update contact tests', function () {
    it('should update a specific contact', (done) => {
      db.Contact.prototype.getById = () => contacts[0];
      db.Contact.prototype.updateById = () => contacts[0];
      res.json = (json) => {
        assert(json === contacts[0]);
        done();
      };
      contactCtrl(db).updateContact(req, res, null);
    });

    it('should return 404 when contact does not exist', (done) => {
      db.Contact.prototype.getById = () => null;
      res.status = (code) => {
        assert(code === 404);
        return { json: () => done() };
      };
      contactCtrl(db).updateContact(req, res, null);
    });
  });

  describe('Delete contact tests', function () {
    it('should delete a contact', (done) => {
      db.Contact.prototype.getById = () => contacts[0];
      db.Contact.prototype.deleteById = () => contacts[0];
      res.json = (json) => {
        assert(json.message === 'success');
        done();
      };
      contactCtrl(db).deleteContact(req, res, null);
    });

    it('should return 404 when contact does not exist', (done) => {
      db.Contact.prototype.getById = () => null;
      res.status = (code) => {
        assert(code === 404);
        return { json: () => done() };
      };
      contactCtrl(db).deleteContact(req, res, null);
    });
  });
});
