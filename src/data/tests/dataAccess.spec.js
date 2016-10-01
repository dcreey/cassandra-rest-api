/**
 * Created by dcreey on 8/30/2016.
 */
/* eslint-disable prefer-arrow-callback */

import assert from 'assert';
import db from '../dataAccess';

describe('test database access object', function () {
  it('Should have a cassandra client property', function () {
    assert.ok(db.cassandraClient);
  });

  it('Should have a contact property', function () {
    assert.ok(db.contact);
  });
});
