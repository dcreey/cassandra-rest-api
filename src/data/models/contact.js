/**
 * Created by dcreey on 8/29/2016.
 */
const Promise = require('bluebird');

const modelName = 'Contact';
const queries = {
  getByEmailQuery: 'SELECT * FROM contact WHERE email=?',
};

function ContactModel(client, dataTypes, ModelBuilder) {
  const properties = [
    { name: 'id', dbColumnName: 'id', type: dataTypes.timeuuid },
    { name: 'firstName', dbColumnName: 'first_name', type: dataTypes.string },
    { name: 'lastName', dbColumnName: 'last_name', type: dataTypes.string },
    { name: 'email', dbColumnName: 'email', type: dataTypes.int },
    { name: 'phoneNumber', dbColumnName: 'phone_number', type: dataTypes.string },
  ];

  // build base model
  const modelBuilder = new ModelBuilder(modelName, properties);
  const Model = modelBuilder.getModel();

  // extend base model with custom mappings
  class Contact extends Model {
    static getByEmail(email) {
      return new Promise((res, rej) => {
        client.execute(queries.getQuery, [email], (err, result) => {
          if (err) {
            rej(err);
          } else if (result.rows.length === 0) {
            res(null);
          } else {
            console.log(`Got ${modelName} with id ${result.rows[0].id}`);
            res(new Model(result.rows[0]));
          }
        });
      });
    }
  }

  return Contact;
}

export default ContactModel;
