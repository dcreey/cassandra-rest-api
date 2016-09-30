/**
 * Created by dcreey on 8/31/2016.
 * Business Logic Layer for Contact
 */

function sendResponse(res, response) {
  res.json(response);
}
function sendNullResponse(res, err) {
  res.status(404).json({ error: err });
}
function sendConflictResponse(res, err) {
  res.status(409).json({ error: err });
}
function errorHandler(next, err) {
  next(err);
}

module.exports = function contactCtrl(dataAccess) {
  return {
    getAll(req, res, next) {
      dataAccess.contact.getAll().then((contacts) => {
        if (contacts.length === 0) {
          sendNullResponse(res, 'No contacts matching parameters');
        } else {
          sendResponse(res, contacts);
        }
      }).catch((e) => { errorHandler(next, e); });
    },
    createContact(req, res, next) {
      dataAccess.contact.getById(req.params.contact_id).then((contact) => {
        if (contact) {
          sendConflictResponse(res, 'Contact already exists');
        } else {
          dataAccess.contact.create(req.body).then((createdContact) => {
            sendResponse(res, createdContact);
          });
        }
      }).catch((e) => { errorHandler(next, e); });
    },
    getContact(req, res, next) {
      dataAccess.contact.getById(req.params.contact_id).then((contact) => {
        if (!contact) {
          sendNullResponse(res, 'Contact does not exist');
        } else {
          sendResponse(res, contact);
        }
      }).catch((e) => { errorHandler(next, e); });
    },
    updateContact(req, res, next) {
      dataAccess.contact.getById(req.params.contact_id).then((contact) => {
        if (!contact) {
          sendNullResponse(res, 'Contact does not exist');
        } else {
          dataAccess.contact.updateById(contact.id, contact).then((updatedContact) => {
            sendResponse(res, updatedContact);
          });
        }
      }).catch((e) => { errorHandler(next, e); });
    },

    deleteContact(req, res, next) {
      dataAccess.contact.getById(req.params.contact_id).then((contact) => {
        if (!contact) {
          sendNullResponse(res, 'Contact does not exist');
        } else {
          dataAccess.contact.deleteById(req.params.contact_id).then(() => {
            sendResponse(res, { message: 'success' });
          });
        }
      }).catch((e) => { errorHandler(next, e); });
    },

  };
};
