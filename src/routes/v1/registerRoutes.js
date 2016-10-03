/**
 * Created by dcreey on 10/2/2016.
 */

const contactRoutes = require('./contact');

function registerRoutes(router, dataAccess) {
  contactRoutes(router, dataAccess);
}

export default registerRoutes;
