/**
 * Created by dcreey on 9/30/2016.
 */

const context = require.context('../src/', true, /.+\.spec\.js?$/);
context.keys().forEach(context);
module.exports = context;
