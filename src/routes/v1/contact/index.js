/**
 * Created by dcreey on 8/29/2016.
 * Routing for Contacts
 */
import contactCtrl from './contactCtrl';

function routes(router, dataAccess) {
  const contactController = contactCtrl(dataAccess);

  router.route('/contacts')
    .get(contactController.getAll)
    .post(contactController.createContact);

  router.route('/contacts/:contact_id')
    .get(contactController.getContact)
    .put(contactController.updateContact)
    .delete(contactController.deleteContact);
}

module.exports = routes;
