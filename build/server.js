require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _express = __webpack_require__(12);
  
  var _express2 = _interopRequireDefault(_express);
  
  var _path = __webpack_require__(1);
  
  var _path2 = _interopRequireDefault(_path);
  
  var _dataAccess = __webpack_require__(3);
  
  var _dataAccess2 = _interopRequireDefault(_dataAccess);
  
  var _logger = __webpack_require__(5);
  
  var _logger2 = _interopRequireDefault(_logger);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Created by dcreey on 8/30/2016.
   */
  var port = process.env.PORT || '3000';
  var routeArray = { versions: [], routes: {} };
  
  var req = __webpack_require__(9);
  req.keys().forEach(function (key) {
    var version = key.split(_path2.default.posix.sep)[1];
    if (routeArray.routes[version]) {
      routeArray.routes[version].push(req(key));
    } else {
      routeArray.versions.push(version);
      routeArray.routes[version] = [req(key)];
    }
    console.log('API Version ' + version + ' Registered');
  });
  
  // create express app
  var app = (0, _express2.default)();
  
  // register request logger
  app.use(_logger2.default.routeLogger);
  
  // register all api routes
  routeArray.versions.forEach(function (version) {
    var router = new _express2.default.Router();
    router.get('/error', function (req, res, next) {
      return (
        // here we cause an error in the pipeline so we see express-winston in action.
        next(new Error('This is an error and it should be logged to the console'))
      );
    });
    routeArray.routes[version].forEach(function (route) {
      route(router, _dataAccess2.default);
    });
    app.use('/' + version, router);
  });
  
  // register error logger
  app.use(_logger2.default.errorLogger);
  
  app.listen(port, function () {
    var message = 'express-winston demo listening on port = ' + port + '\n                   in ' + app.settings.env + ' mode';
    console.log(message);
  });
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcc2VydmVyLmpzIl0sIm5hbWVzIjpbInBvcnQiLCJwcm9jZXNzIiwiZW52IiwiUE9SVCIsInJvdXRlQXJyYXkiLCJ2ZXJzaW9ucyIsInJvdXRlcyIsInJlcSIsInJlcXVpcmUiLCJjb250ZXh0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJ2ZXJzaW9uIiwic3BsaXQiLCJwb3NpeCIsInNlcCIsInB1c2giLCJjb25zb2xlIiwibG9nIiwiYXBwIiwidXNlIiwicm91dGVMb2dnZXIiLCJyb3V0ZXIiLCJSb3V0ZXIiLCJnZXQiLCJyZXMiLCJuZXh0IiwiRXJyb3IiLCJyb3V0ZSIsImVycm9yTG9nZ2VyIiwibGlzdGVuIiwibWVzc2FnZSIsInNldHRpbmdzIl0sIm1hcHBpbmdzIjoiOztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFOQTs7O0FBUUEsSUFBTUEsT0FBT0MsUUFBUUMsR0FBUixDQUFZQyxJQUFaLElBQW9CLE1BQWpDO0FBQ0EsSUFBTUMsYUFBYSxFQUFFQyxVQUFVLEVBQVosRUFBZ0JDLFFBQVEsRUFBeEIsRUFBbkI7O0FBRUEsSUFBTUMsTUFBTUMsUUFBUUMsT0FBUixDQUFnQixVQUFoQixFQUE0QixJQUE1QixFQUFrQyxxQkFBbEMsQ0FBWjtBQUNBRixJQUFJRyxJQUFKLEdBQVdDLE9BQVgsQ0FBbUIsVUFBQ0MsR0FBRCxFQUFTO0FBQzFCLE1BQU1DLFVBQVVELElBQUlFLEtBQUosQ0FBVSxlQUFLQyxLQUFMLENBQVdDLEdBQXJCLEVBQTBCLENBQTFCLENBQWhCO0FBQ0EsTUFBSVosV0FBV0UsTUFBWCxDQUFrQk8sT0FBbEIsQ0FBSixFQUFnQztBQUM5QlQsZUFBV0UsTUFBWCxDQUFrQk8sT0FBbEIsRUFBMkJJLElBQTNCLENBQWdDVixJQUFJSyxHQUFKLENBQWhDO0FBQ0QsR0FGRCxNQUVPO0FBQ0xSLGVBQVdDLFFBQVgsQ0FBb0JZLElBQXBCLENBQXlCSixPQUF6QjtBQUNBVCxlQUFXRSxNQUFYLENBQWtCTyxPQUFsQixJQUE2QixDQUFDTixJQUFJSyxHQUFKLENBQUQsQ0FBN0I7QUFDRDtBQUNETSxVQUFRQyxHQUFSLGtCQUEyQk4sT0FBM0I7QUFDRCxDQVREOztBQVdBO0FBQ0EsSUFBTU8sTUFBTSx3QkFBWjs7QUFFQTtBQUNBQSxJQUFJQyxHQUFKLENBQVEsaUJBQU9DLFdBQWY7O0FBRUE7QUFDQWxCLFdBQVdDLFFBQVgsQ0FBb0JNLE9BQXBCLENBQTRCLFVBQUNFLE9BQUQsRUFBYTtBQUN2QyxNQUFNVSxTQUFTLElBQUksa0JBQVFDLE1BQVosRUFBZjtBQUNBRCxTQUFPRSxHQUFQLENBQVcsUUFBWCxFQUFxQixVQUFDbEIsR0FBRCxFQUFNbUIsR0FBTixFQUFXQyxJQUFYO0FBQUE7QUFDbkI7QUFDQUEsV0FBSyxJQUFJQyxLQUFKLENBQVUseURBQVYsQ0FBTDtBQUZtQjtBQUFBLEdBQXJCO0FBSUF4QixhQUFXRSxNQUFYLENBQWtCTyxPQUFsQixFQUEyQkYsT0FBM0IsQ0FBbUMsVUFBQ2tCLEtBQUQsRUFBVztBQUM1Q0EsVUFBTU4sTUFBTjtBQUNELEdBRkQ7QUFHQUgsTUFBSUMsR0FBSixPQUFZUixPQUFaLEVBQXVCVSxNQUF2QjtBQUNELENBVkQ7O0FBWUE7QUFDQUgsSUFBSUMsR0FBSixDQUFRLGlCQUFPUyxXQUFmOztBQUVBVixJQUFJVyxNQUFKLENBQVcvQixJQUFYLEVBQWlCLFlBQU07QUFDckIsTUFBTWdDLHdEQUFzRGhDLElBQXRELGdDQUNnQm9CLElBQUlhLFFBQUosQ0FBYS9CLEdBRDdCLFVBQU47QUFFQWdCLFVBQVFDLEdBQVIsQ0FBWWEsT0FBWjtBQUNELENBSkQiLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL2RjcmVleS9XZWJzdG9ybVByb2plY3RzL3JlYy9hcGkiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgZGNyZWV5IG9uIDgvMzAvMjAxNi5cbiAqL1xuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBkYXRhQWNjZXNzIGZyb20gJy4vZGF0YS9kYXRhQWNjZXNzJztcbmltcG9ydCBsb2dnZXIgZnJvbSAnLi9taWRkbGV3YXJlL2xvZ2dlcic7XG5cbmNvbnN0IHBvcnQgPSBwcm9jZXNzLmVudi5QT1JUIHx8ICczMDAwJztcbmNvbnN0IHJvdXRlQXJyYXkgPSB7IHZlcnNpb25zOiBbXSwgcm91dGVzOiB7fSB9O1xuXG5jb25zdCByZXEgPSByZXF1aXJlLmNvbnRleHQoJy4vcm91dGVzJywgdHJ1ZSwgL2luZGV4KlxcLihqcyQpW14uXSokLyk7XG5yZXEua2V5cygpLmZvckVhY2goKGtleSkgPT4ge1xuICBjb25zdCB2ZXJzaW9uID0ga2V5LnNwbGl0KHBhdGgucG9zaXguc2VwKVsxXTtcbiAgaWYgKHJvdXRlQXJyYXkucm91dGVzW3ZlcnNpb25dKSB7XG4gICAgcm91dGVBcnJheS5yb3V0ZXNbdmVyc2lvbl0ucHVzaChyZXEoa2V5KSk7XG4gIH0gZWxzZSB7XG4gICAgcm91dGVBcnJheS52ZXJzaW9ucy5wdXNoKHZlcnNpb24pO1xuICAgIHJvdXRlQXJyYXkucm91dGVzW3ZlcnNpb25dID0gW3JlcShrZXkpXTtcbiAgfVxuICBjb25zb2xlLmxvZyhgQVBJIFZlcnNpb24gJHt2ZXJzaW9ufSBSZWdpc3RlcmVkYCk7XG59KTtcblxuLy8gY3JlYXRlIGV4cHJlc3MgYXBwXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5cbi8vIHJlZ2lzdGVyIHJlcXVlc3QgbG9nZ2VyXG5hcHAudXNlKGxvZ2dlci5yb3V0ZUxvZ2dlcik7XG5cbi8vIHJlZ2lzdGVyIGFsbCBhcGkgcm91dGVzXG5yb3V0ZUFycmF5LnZlcnNpb25zLmZvckVhY2goKHZlcnNpb24pID0+IHtcbiAgY29uc3Qgcm91dGVyID0gbmV3IGV4cHJlc3MuUm91dGVyKCk7XG4gIHJvdXRlci5nZXQoJy9lcnJvcicsIChyZXEsIHJlcywgbmV4dCkgPT5cbiAgICAvLyBoZXJlIHdlIGNhdXNlIGFuIGVycm9yIGluIHRoZSBwaXBlbGluZSBzbyB3ZSBzZWUgZXhwcmVzcy13aW5zdG9uIGluIGFjdGlvbi5cbiAgICBuZXh0KG5ldyBFcnJvcignVGhpcyBpcyBhbiBlcnJvciBhbmQgaXQgc2hvdWxkIGJlIGxvZ2dlZCB0byB0aGUgY29uc29sZScpKVxuICApO1xuICByb3V0ZUFycmF5LnJvdXRlc1t2ZXJzaW9uXS5mb3JFYWNoKChyb3V0ZSkgPT4ge1xuICAgIHJvdXRlKHJvdXRlciwgZGF0YUFjY2Vzcyk7XG4gIH0pO1xuICBhcHAudXNlKGAvJHt2ZXJzaW9ufWAsIHJvdXRlcik7XG59KTtcblxuLy8gcmVnaXN0ZXIgZXJyb3IgbG9nZ2VyXG5hcHAudXNlKGxvZ2dlci5lcnJvckxvZ2dlcik7XG5cbmFwcC5saXN0ZW4ocG9ydCwgKCkgPT4ge1xuICBjb25zdCBtZXNzYWdlID0gYGV4cHJlc3Mtd2luc3RvbiBkZW1vIGxpc3RlbmluZyBvbiBwb3J0ID0gJHtwb3J0fVxuICAgICAgICAgICAgICAgICAgIGluICR7YXBwLnNldHRpbmdzLmVudn0gbW9kZWA7XG4gIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xufSk7XG5cbiJdfQ==

/***/ },
/* 1 */
/***/ function(module, exports) {

  module.exports = require("path");

/***/ },
/* 2 */
/***/ function(module, exports) {

  module.exports = require("winston-daily-rotate-file");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _bluebird = __webpack_require__(10);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _cassandraDriver = __webpack_require__(11);
  
  var _cassandraDriver2 = _interopRequireDefault(_cassandraDriver);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Created by dcreey on 8/29/2016.
   */
  
  var path = __webpack_require__(1);
  // const fs = require('fs');
  
  var client = new _cassandraDriver2.default.Client({ contactPoints: ['127.0.0.1'], keyspace: 'testkeyspace' });
  
  // build database access object
  var dataAccess = { cassandraClient: client };
  
  var req = __webpack_require__(8);
  req.keys().forEach(function (key) {
    var modelName = path.basename(key, '.js');
    var model = req(key);
    dataAccess[modelName] = model(client, _cassandraDriver2.default.types, _bluebird2.default);
  });
  
  // fs
  //    .readdirSync(Path.join(__dirname, 'models'))
  //    .filter((file) => (file.indexOf('.') !== 0) && (file.indexOf('spec') === -1))
  //    .forEach((file) => {
  //      const modelPath = Path.join(__dirname, 'models', file);
  //      const model = require(modelPath); // eslint-disable-line global-require
  //      db[file.replace('.js', '')] = model(client, cassandra.types, Promise);
  //    });
  
  exports.default = dataAccess;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcZGF0YVxcZGF0YUFjY2Vzcy5qcyJdLCJuYW1lcyI6WyJwYXRoIiwicmVxdWlyZSIsImNsaWVudCIsIkNsaWVudCIsImNvbnRhY3RQb2ludHMiLCJrZXlzcGFjZSIsImRhdGFBY2Nlc3MiLCJjYXNzYW5kcmFDbGllbnQiLCJyZXEiLCJjb250ZXh0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJtb2RlbE5hbWUiLCJiYXNlbmFtZSIsIm1vZGVsIiwidHlwZXMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUlBOzs7O0FBQ0E7Ozs7OztBQUxBOzs7O0FBT0EsSUFBTUEsT0FBT0MsUUFBUSxNQUFSLENBQWI7QUFDQTs7QUFFQSxJQUFNQyxTQUFTLElBQUksMEJBQVVDLE1BQWQsQ0FBcUIsRUFBRUMsZUFBZSxDQUFDLFdBQUQsQ0FBakIsRUFBZ0NDLFVBQVUsY0FBMUMsRUFBckIsQ0FBZjs7QUFFQTtBQUNBLElBQU1DLGFBQWEsRUFBRUMsaUJBQWlCTCxNQUFuQixFQUFuQjs7QUFFQSxJQUFNTSxNQUFNUCxRQUFRUSxPQUFSLENBQWdCLFVBQWhCLEVBQTRCLElBQTVCLEVBQWtDLHVCQUFsQyxDQUFaO0FBQ0FELElBQUlFLElBQUosR0FBV0MsT0FBWCxDQUFtQixVQUFDQyxHQUFELEVBQVM7QUFDMUIsTUFBTUMsWUFBWWIsS0FBS2MsUUFBTCxDQUFjRixHQUFkLEVBQW1CLEtBQW5CLENBQWxCO0FBQ0EsTUFBTUcsUUFBUVAsSUFBSUksR0FBSixDQUFkO0FBQ0FOLGFBQVdPLFNBQVgsSUFBd0JFLE1BQU1iLE1BQU4sRUFBYywwQkFBVWMsS0FBeEIscUJBQXhCO0FBQ0QsQ0FKRDs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztrQkFFZVYsVSIsImZpbGUiOiJkYXRhQWNjZXNzLmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL2RjcmVleS9XZWJzdG9ybVByb2plY3RzL3JlYy9hcGkiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgZGNyZWV5IG9uIDgvMjkvMjAxNi5cbiAqL1xuXG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgY2Fzc2FuZHJhIGZyb20gJ2Nhc3NhbmRyYS1kcml2ZXInO1xuXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuLy8gY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuXG5jb25zdCBjbGllbnQgPSBuZXcgY2Fzc2FuZHJhLkNsaWVudCh7IGNvbnRhY3RQb2ludHM6IFsnMTI3LjAuMC4xJ10sIGtleXNwYWNlOiAndGVzdGtleXNwYWNlJyB9KTtcblxuLy8gYnVpbGQgZGF0YWJhc2UgYWNjZXNzIG9iamVjdFxuY29uc3QgZGF0YUFjY2VzcyA9IHsgY2Fzc2FuZHJhQ2xpZW50OiBjbGllbnQgfTtcblxuY29uc3QgcmVxID0gcmVxdWlyZS5jb250ZXh0KCcuL21vZGVscycsIHRydWUsIC9eKCg/IVxcLnNwZWMpLikqKC5qcykkLyk7XG5yZXEua2V5cygpLmZvckVhY2goKGtleSkgPT4ge1xuICBjb25zdCBtb2RlbE5hbWUgPSBwYXRoLmJhc2VuYW1lKGtleSwgJy5qcycpO1xuICBjb25zdCBtb2RlbCA9IHJlcShrZXkpO1xuICBkYXRhQWNjZXNzW21vZGVsTmFtZV0gPSBtb2RlbChjbGllbnQsIGNhc3NhbmRyYS50eXBlcywgUHJvbWlzZSk7XG59KTtcblxuLy8gZnNcbi8vICAgIC5yZWFkZGlyU3luYyhQYXRoLmpvaW4oX19kaXJuYW1lLCAnbW9kZWxzJykpXG4vLyAgICAuZmlsdGVyKChmaWxlKSA9PiAoZmlsZS5pbmRleE9mKCcuJykgIT09IDApICYmIChmaWxlLmluZGV4T2YoJ3NwZWMnKSA9PT0gLTEpKVxuLy8gICAgLmZvckVhY2goKGZpbGUpID0+IHtcbi8vICAgICAgY29uc3QgbW9kZWxQYXRoID0gUGF0aC5qb2luKF9fZGlybmFtZSwgJ21vZGVscycsIGZpbGUpO1xuLy8gICAgICBjb25zdCBtb2RlbCA9IHJlcXVpcmUobW9kZWxQYXRoKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBnbG9iYWwtcmVxdWlyZVxuLy8gICAgICBkYltmaWxlLnJlcGxhY2UoJy5qcycsICcnKV0gPSBtb2RlbChjbGllbnQsIGNhc3NhbmRyYS50eXBlcywgUHJvbWlzZSk7XG4vLyAgICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgZGF0YUFjY2VzcztcbiJdfQ==

/***/ },
/* 4 */
/***/ function(module, exports) {

  'use strict';
  
  /**
   * Created by dcreey on 8/29/2016.
   */
  
  var getAllQuery = 'SELECT * FROM contact';
  var getQuery = 'SELECT * FROM contact WHERE id=?';
  var updateQuery = 'UPDATE contact SET {0} WHERE id=?';
  var deleteQuery = 'DELETE FROM contact WHERE id=?';
  var createQuery = 'INSERT INTO contact ({0}) VALUES ({1})';
  
  function Contact() {
    return {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: ''
    };
  }
  function parsePhoneNumber(number) {
    var num = number.trim().replace(' ', '').replace('-', '').replace('(', '').replace(')', '');
    return parseInt(num, 10);
  }
  
  function buildPropertyList(c1, c2, id) {
    var values = [];
    values.push(c1.firstName === undefined ? c2.firstName : c1.firstName.trim());
    values.push(c1.lastName === undefined ? c2.lastName : c1.lastName.trim());
    values.push(c1.email === undefined ? c2.email : c1.email.trim());
    values.push(c1.phoneNumber === undefined ? c2.phoneNumber : parsePhoneNumber(c1.phoneNumber));
    values.push(id);
    return values;
  }
  
  module.exports = function (client, dataTypes, Promise) {
    return {
      getNewContact: function getNewContact() {
        return new Contact();
      },
      getAll: function getAll() {
        return new Promise(function (res, rej) {
          client.execute(getAllQuery, [], function (err, result) {
            if (err) {
              rej(err);
            } else {
              console.info('Returning ' + result.rows.length + ' contacts');
              res(result);
            }
          });
        });
      },
      getById: function getById(id) {
        return new Promise(function (res, rej) {
          client.execute(getQuery, [id], function (err, result) {
            if (err) {
              rej(err);
            } else if (result.rows.length === 0) {
              res(null);
            } else {
              console.log('got contact with id ' + result.rows[0].id);
              res(result.rows[0]);
            }
          });
        });
      },
      updateById: function updateById(id, contact) {
        return new Promise(function (res, rej) {
          client.execute(getQuery, [id], function (err, contactInDb) {
            if (err) {
              rej(err);
            } else {
              var values = buildPropertyList(contact, contactInDb, id);
              var fieldsToUpdate = 'first_name=?,last_name=?,email=?,phone=?';
              client.execute(updateQuery.replace('{0}', fieldsToUpdate), values, function (e, result) {
                if (e) {
                  rej(e);
                } else {
                  res(result);
                }
              });
            }
          });
        });
      },
      deleteById: function deleteById(id) {
        return new Promise(function (res, rej) {
          client.execute(deleteQuery, [id], function (err, result) {
            if (err) {
              rej(err);
            } else {
              console.log('Deleted contact with id ' + id);
              res(result);
            }
          });
        });
      },
      create: function create(contact) {
        var contactToInsert = contact;
        contactToInsert.id = dataTypes.timeuuid();
        return new Promise(function (res, rej) {
          var fieldsToPush = 'id,first_name,last_name,email,phone';
          var query = createQuery.replace('{0}', fieldsToPush).replace('{1}', '?,?,?,?,?');
          var values = buildPropertyList(contactToInsert, new Contact(), contactToInsert.id);
          client.execute(query, values, function (err) {
            if (err) {
              rej(err);
            } else {
              console.log('Inserted contact with id ' + contact.id);
              res(contact);
            }
          });
        });
      }
    };
  };
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcZGF0YVxcbW9kZWxzXFxjb250YWN0LmpzIl0sIm5hbWVzIjpbImdldEFsbFF1ZXJ5IiwiZ2V0UXVlcnkiLCJ1cGRhdGVRdWVyeSIsImRlbGV0ZVF1ZXJ5IiwiY3JlYXRlUXVlcnkiLCJDb250YWN0IiwiaWQiLCJmaXJzdE5hbWUiLCJsYXN0TmFtZSIsImVtYWlsIiwicGhvbmVOdW1iZXIiLCJwYXJzZVBob25lTnVtYmVyIiwibnVtYmVyIiwibnVtIiwidHJpbSIsInJlcGxhY2UiLCJwYXJzZUludCIsImJ1aWxkUHJvcGVydHlMaXN0IiwiYzEiLCJjMiIsInZhbHVlcyIsInB1c2giLCJ1bmRlZmluZWQiLCJtb2R1bGUiLCJleHBvcnRzIiwiY2xpZW50IiwiZGF0YVR5cGVzIiwiUHJvbWlzZSIsImdldE5ld0NvbnRhY3QiLCJnZXRBbGwiLCJyZXMiLCJyZWoiLCJleGVjdXRlIiwiZXJyIiwicmVzdWx0IiwiY29uc29sZSIsImluZm8iLCJyb3dzIiwibGVuZ3RoIiwiZ2V0QnlJZCIsImxvZyIsInVwZGF0ZUJ5SWQiLCJjb250YWN0IiwiY29udGFjdEluRGIiLCJmaWVsZHNUb1VwZGF0ZSIsImUiLCJkZWxldGVCeUlkIiwiY3JlYXRlIiwiY29udGFjdFRvSW5zZXJ0IiwidGltZXV1aWQiLCJmaWVsZHNUb1B1c2giLCJxdWVyeSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUlBLElBQU1BLGNBQWMsdUJBQXBCO0FBQ0EsSUFBTUMsV0FBVyxrQ0FBakI7QUFDQSxJQUFNQyxjQUFjLG1DQUFwQjtBQUNBLElBQU1DLGNBQWMsZ0NBQXBCO0FBQ0EsSUFBTUMsY0FBYyx3Q0FBcEI7O0FBRUEsU0FBU0MsT0FBVCxHQUFtQjtBQUNqQixTQUFPO0FBQ0xDLFFBQUksRUFEQztBQUVMQyxlQUFXLEVBRk47QUFHTEMsY0FBVSxFQUhMO0FBSUxDLFdBQU8sRUFKRjtBQUtMQyxpQkFBYTtBQUxSLEdBQVA7QUFPRDtBQUNELFNBQVNDLGdCQUFULENBQTBCQyxNQUExQixF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QUMvQixZQUFNbUIsZUFBZSxxQ0FBckI7QUFDQSxZQUFNQyxRQUFRL0MsWUFBWVcsT0FBWixDQUFvQixLQUFwQixFQUEyQm1DLFlBQTNCLEVBQXlDbkMsT0FBekMsQ0FBaUQsS0FBakQsRUFBd0QsV0FBeEQsQ0FBZDtBQUNBLFlBQU1LLFNBQVNILGtCQUFrQitCLGVBQWxCLEVBQW1DLElBQUkzQyxPQUFKLEVBQW5DLEVBQWtEMkMsZ0JBQWdCMUMsRUFBbEUsQ0FBZjtBQUNBbUIsZUFBT08sT0FBUCxDQUFlbUIsS0FBZixFQUFzQi9CLE1BQXRCLEVBQThCLFVBQUNhLEdBQUQsRUFBUztBQUNyQyxjQUFJQSxHQUFKLEVBQVM7QUFDUEYsZ0JBQUlFLEdBQUo7QUFDRCxXQUZELE1BRU87QUFDTEUsb0JBQVFLLEdBQVIsK0JBQXdDRSxRQUFRcEMsRUFBaEQ7QUFDQXdCLGdCQUFJWSxPQUFKO0FBQ0Q7QUFDRixTQVBEO0FBUUQsT0FaTSxDQUFQO0FBYUQ7QUE5RUksR0FBUDtBQWdGRCxDQWpGRCIsImZpbGUiOiJjb250YWN0LmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL2RjcmVleS9XZWJzdG9ybVByb2plY3RzL3JlYy9hcGkiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgZGNyZWV5IG9uIDgvMjkvMjAxNi5cbiAqL1xuXG5jb25zdCBnZXRBbGxRdWVyeSA9ICdTRUxFQ1QgKiBGUk9NIGNvbnRhY3QnO1xuY29uc3QgZ2V0UXVlcnkgPSAnU0VMRUNUICogRlJPTSBjb250YWN0IFdIRVJFIGlkPT8nO1xuY29uc3QgdXBkYXRlUXVlcnkgPSAnVVBEQVRFIGNvbnRhY3QgU0VUIHswfSBXSEVSRSBpZD0/JztcbmNvbnN0IGRlbGV0ZVF1ZXJ5ID0gJ0RFTEVURSBGUk9NIGNvbnRhY3QgV0hFUkUgaWQ9Pyc7XG5jb25zdCBjcmVhdGVRdWVyeSA9ICdJTlNFUlQgSU5UTyBjb250YWN0ICh7MH0pIFZBTFVFUyAoezF9KSc7XG5cbmZ1bmN0aW9uIENvbnRhY3QoKSB7XG4gIHJldHVybiB7XG4gICAgaWQ6ICcnLFxuICAgIGZpcnN0TmFtZTogJycsXG4gICAgbGFzdE5hbWU6ICcnLFxuICAgIGVtYWlsOiAnJyxcbiAgICBwaG9uZU51bWJlcjogJycsXG4gIH07XG59XG5mdW5jdGlvbiBwYXJzZVBob25lTnVtYmVyKG51bWJlcikge1xuICBjb25zdCBudW0gPSBudW1iZXIudHJpbSgpXG4gICAgLnJlcGxhY2UoJyAnLCAnJylcbiAgICAucmVwbGFjZSgnLScsICcnKVxuICAgIC5yZXBsYWNlKCcoJywgJycpXG4gICAgLnJlcGxhY2UoJyknLCAnJyk7XG4gIHJldHVybiBwYXJzZUludChudW0sIDEwKTtcbn1cblxuZnVuY3Rpb24gYnVpbGRQcm9wZXJ0eUxpc3QoYzEsIGMyLCBpZCkge1xuICBjb25zdCB2YWx1ZXMgPSBbXTtcbiAgdmFsdWVzLnB1c2goYzEuZmlyc3ROYW1lID09PSB1bmRlZmluZWQgPyBjMi5maXJzdE5hbWUgOiBjMS5maXJzdE5hbWUudHJpbSgpKTtcbiAgdmFsdWVzLnB1c2goYzEubGFzdE5hbWUgPT09IHVuZGVmaW5lZCA/IGMyLmxhc3ROYW1lIDogYzEubGFzdE5hbWUudHJpbSgpKTtcbiAgdmFsdWVzLnB1c2goYzEuZW1haWwgPT09IHVuZGVmaW5lZCA/IGMyLmVtYWlsIDogYzEuZW1haWwudHJpbSgpKTtcbiAgdmFsdWVzLnB1c2goYzEucGhvbmVOdW1iZXIgPT09IHVuZGVmaW5lZCA/IGMyLnBob25lTnVtYmVyIDogcGFyc2VQaG9uZU51bWJlcihjMS5waG9uZU51bWJlcikpO1xuICB2YWx1ZXMucHVzaChpZCk7XG4gIHJldHVybiB2YWx1ZXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNsaWVudCwgZGF0YVR5cGVzLCBQcm9taXNlKSB7XG4gIHJldHVybiB7XG4gICAgZ2V0TmV3Q29udGFjdCgpIHsgcmV0dXJuIG5ldyBDb250YWN0KCk7IH0sXG4gICAgZ2V0QWxsKCkge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgICAgICBjbGllbnQuZXhlY3V0ZShnZXRBbGxRdWVyeSwgW10sIChlcnIsIHJlc3VsdCkgPT4ge1xuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIHJlaihlcnIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmluZm8oYFJldHVybmluZyAke3Jlc3VsdC5yb3dzLmxlbmd0aH0gY29udGFjdHNgKTtcbiAgICAgICAgICAgIHJlcyhyZXN1bHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGdldEJ5SWQoaWQpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgICAgY2xpZW50LmV4ZWN1dGUoZ2V0UXVlcnksIFtpZF0sIChlcnIsIHJlc3VsdCkgPT4ge1xuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIHJlaihlcnIpO1xuICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0LnJvd3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXMobnVsbCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBnb3QgY29udGFjdCB3aXRoIGlkICR7cmVzdWx0LnJvd3NbMF0uaWR9YCk7XG4gICAgICAgICAgICByZXMocmVzdWx0LnJvd3NbMF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgdXBkYXRlQnlJZChpZCwgY29udGFjdCkge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgICAgICBjbGllbnQuZXhlY3V0ZShnZXRRdWVyeSwgW2lkXSwgKGVyciwgY29udGFjdEluRGIpID0+IHtcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICByZWooZXJyKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gYnVpbGRQcm9wZXJ0eUxpc3QoY29udGFjdCwgY29udGFjdEluRGIsIGlkKTtcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkc1RvVXBkYXRlID0gJ2ZpcnN0X25hbWU9PyxsYXN0X25hbWU9PyxlbWFpbD0/LHBob25lPT8nO1xuICAgICAgICAgICAgY2xpZW50LmV4ZWN1dGUodXBkYXRlUXVlcnkucmVwbGFjZSgnezB9JywgZmllbGRzVG9VcGRhdGUpLCB2YWx1ZXMsIChlLCByZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGUpIHtcbiAgICAgICAgICAgICAgICByZWooZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzKHJlc3VsdCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgZGVsZXRlQnlJZChpZCkge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgICAgICBjbGllbnQuZXhlY3V0ZShkZWxldGVRdWVyeSwgW2lkXSwgKGVyciwgcmVzdWx0KSA9PiB7XG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgcmVqKGVycik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBEZWxldGVkIGNvbnRhY3Qgd2l0aCBpZCAke2lkfWApO1xuICAgICAgICAgICAgcmVzKHJlc3VsdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBjcmVhdGUoY29udGFjdCkge1xuICAgICAgY29uc3QgY29udGFjdFRvSW5zZXJ0ID0gY29udGFjdDtcbiAgICAgIGNvbnRhY3RUb0luc2VydC5pZCA9IGRhdGFUeXBlcy50aW1ldXVpZCgpO1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgICAgICBjb25zdCBmaWVsZHNUb1B1c2ggPSAnaWQsZmlyc3RfbmFtZSxsYXN0X25hbWUsZW1haWwscGhvbmUnO1xuICAgICAgICBjb25zdCBxdWVyeSA9IGNyZWF0ZVF1ZXJ5LnJlcGxhY2UoJ3swfScsIGZpZWxkc1RvUHVzaCkucmVwbGFjZSgnezF9JywgJz8sPyw/LD8sPycpO1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSBidWlsZFByb3BlcnR5TGlzdChjb250YWN0VG9JbnNlcnQsIG5ldyBDb250YWN0KCksIGNvbnRhY3RUb0luc2VydC5pZCk7XG4gICAgICAgIGNsaWVudC5leGVjdXRlKHF1ZXJ5LCB2YWx1ZXMsIChlcnIpID0+IHtcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICByZWooZXJyKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYEluc2VydGVkIGNvbnRhY3Qgd2l0aCBpZCAke2NvbnRhY3QuaWR9YCk7XG4gICAgICAgICAgICByZXMoY29udGFjdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0sXG4gIH07XG59O1xuIl19

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _winston = __webpack_require__(15);
  
  var _winston2 = _interopRequireDefault(_winston);
  
  var _expressWinston = __webpack_require__(13);
  
  var _expressWinston2 = _interopRequireDefault(_expressWinston);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Created by dcreey on 9/24/2016.
   */
  var fs = __webpack_require__(14);
  
  var env = ("development") || 'development';
  var logDir = 'log';
  var logLevel = env === 'development' ? 'verbose' : 'info';
  
  //winston.emitErrs = true;
  
  // Create the log directory if it does not exist
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }
  
  var tsFormat = function tsFormat() {
    return new Date().toLocaleTimeString();
  };
  
  //const logger = new (winston.Logger)({
  //  transports: [
  //    // colorize the output to the console
  //    new (winston.transports.Console)({
  //      timestamp: tsFormat,
  //      colorize: true,
  //      level: logLevel,
  //    }),
  //    new (require('winston-daily-rotate-file'))({ // eslint-disable-line global-require
  //      filename: `${logDir}/-results.log`,
  //      timestamp: tsFormat,
  //      datePattern: 'yyyy-MM-dd',
  //      prepend: true,
  //      level: logLevel,
  //    }),
  //  ],
  //});
  //
  //logger.debug('Debugging info');
  //logger.verbose('Verbose info');
  //logger.info('Hello world');
  //logger.warn('Warning message');
  //logger.error('Error info');
  //
  //module.exports = logger;
  //module.exports.stream = {
  //  write(message, encoding) {
  //    logger.info(message);
  //  },
  //};
  
  var logger = {};
  
  logger.routeLogger = _expressWinston2.default.logger({
    transports: [new _winston2.default.transports.Console({
      json: true,
      colorize: true
    }), new (__webpack_require__(2))({ // eslint-disable-line global-require
      filename: logDir + '/-results.log',
      timestamp: tsFormat,
      datePattern: 'yyyy-MM-dd',
      prepend: true,
      level: logLevel
    })],
    meta: true, // control whether you want to log the meta data about the request
    msg: 'HTTP {{res.statusCode}} {{req.method}} {{req.url}}', // {{res.responseTime}}ms
    expressFormat: true, // Use the default Express/morgan request formatting.
    colorize: true
  });
  
  logger.errorLogger = _expressWinston2.default.errorLogger({
    transports: [new _winston2.default.transports.Console({
      json: true,
      colorize: true
    }), new (__webpack_require__(2))({ // eslint-disable-line global-require
      filename: logDir + '/-results.log',
      timestamp: tsFormat,
      datePattern: 'yyyy-MM-dd',
      prepend: true,
      level: logLevel
    })]
  });
  
  exports.default = logger;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xcbWlkZGxld2FyZVxcbG9nZ2VyLmpzIl0sIm5hbWVzIjpbImZzIiwicmVxdWlyZSIsImVudiIsInByb2Nlc3MiLCJOT0RFX0VOViIsImxvZ0RpciIsImxvZ0xldmVsIiwiZXhpc3RzU3luYyIsIm1rZGlyU3luYyIsInRzRm9ybWF0IiwiRGF0ZSIsInRvTG9jYWxlVGltZVN0cmluZyIsImxvZ2dlciIsInJvdXRlTG9nZ2VyIiwidHJhbnNwb3J0cyIsIkNvbnNvbGUiLCJqc29uIiwiY29sb3JpemUiLCJmaWxlbmFtZSIsInRpbWVzdGFtcCIsImRhdGVQYXR0ZXJuIiwicHJlcGVuZCIsImxldmVsIiwibWV0YSIsIm1zZyIsImV4cHJlc3NGb3JtYXQiLCJlcnJvckxvZ2dlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBR0E7Ozs7QUFDQTs7Ozs7O0FBSkE7OztBQU1BLElBQU1BLEtBQUtDLFFBQVEsSUFBUixDQUFYOztBQUVBLElBQU1DLE1BQU1DLFFBQVFELEdBQVIsQ0FBWUUsUUFBWixJQUF3QixhQUFwQztBQUNBLElBQU1DLFNBQVMsS0FBZjtBQUNBLElBQU1DLFdBQVdKLFFBQVEsYUFBUixHQUF3QixTQUF4QixHQUFvQyxNQUFyRDs7QUFFQTs7QUFFQTtBQUNBLElBQUksQ0FBQ0YsR0FBR08sVUFBSCxDQUFjRixNQUFkLENBQUwsRUFBNEI7QUFDMUJMLEtBQUdRLFNBQUgsQ0FBYUgsTUFBYjtBQUNEOztBQUVELElBQU1JLFdBQVcsU0FBWEEsUUFBVztBQUFBLFNBQU8sSUFBSUMsSUFBSixFQUFELENBQWFDLGtCQUFiLEVBQU47QUFBQSxDQUFqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBTUMsU0FBUyxFQUFmOztBQUVBQSxPQUFPQyxXQUFQLEdBQXFCLHlCQUFlRCxNQUFmLENBQXNCO0FBQ3pDRSxjQUFZLENBQ1YsSUFBSSxrQkFBUUEsVUFBUixDQUFtQkMsT0FBdkIsQ0FBK0I7QUFDN0JDLFVBQU0sSUFEdUI7QUFFN0JDLGNBQVU7QUFGbUIsR0FBL0IsQ0FEVSxFQUtWLEtBQUtoQixRQUFRLDJCQUFSLENBQUwsRUFBMkMsRUFBRTtBQUMzQ2lCLGNBQWFiLE1BQWIsa0JBRHlDO0FBRXpDYyxlQUFXVixRQUY4QjtBQUd6Q1csaUJBQWEsWUFINEI7QUFJekNDLGFBQVMsSUFKZ0M7QUFLekNDLFdBQU9oQjtBQUxrQyxHQUEzQyxDQUxVLENBRDZCO0FBY3pDaUIsUUFBTSxJQWRtQyxFQWM3QjtBQUNaQyxPQUFLLG9EQWZvQyxFQWVrQjtBQUMzREMsaUJBQWUsSUFoQjBCLEVBZ0JwQjtBQUNyQlIsWUFBVTtBQWpCK0IsQ0FBdEIsQ0FBckI7O0FBcUJBTCxPQUFPYyxXQUFQLEdBQXFCLHlCQUFlQSxXQUFmLENBQTJCO0FBQzlDWixjQUFZLENBQ1YsSUFBSSxrQkFBUUEsVUFBUixDQUFtQkMsT0FBdkIsQ0FBK0I7QUFDN0JDLFVBQU0sSUFEdUI7QUFFN0JDLGNBQVU7QUFGbUIsR0FBL0IsQ0FEVSxFQUtWLEtBQUtoQixRQUFRLDJCQUFSLENBQUwsRUFBMkMsRUFBRTtBQUMzQ2lCLGNBQWFiLE1BQWIsa0JBRHlDO0FBRXpDYyxlQUFXVixRQUY4QjtBQUd6Q1csaUJBQWEsWUFINEI7QUFJekNDLGFBQVMsSUFKZ0M7QUFLekNDLFdBQU9oQjtBQUxrQyxHQUEzQyxDQUxVO0FBRGtDLENBQTNCLENBQXJCOztrQkFnQmVNLE0iLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL2RjcmVleS9XZWJzdG9ybVByb2plY3RzL3JlYy9hcGkiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgZGNyZWV5IG9uIDkvMjQvMjAxNi5cbiAqL1xuaW1wb3J0IHdpbnN0b24gZnJvbSAnd2luc3Rvbic7XG5pbXBvcnQgZXhwcmVzc1dpbnN0b24gZnJvbSAnZXhwcmVzcy13aW5zdG9uJztcblxuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuXG5jb25zdCBlbnYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViB8fCAnZGV2ZWxvcG1lbnQnO1xuY29uc3QgbG9nRGlyID0gJ2xvZyc7XG5jb25zdCBsb2dMZXZlbCA9IGVudiA9PT0gJ2RldmVsb3BtZW50JyA/ICd2ZXJib3NlJyA6ICdpbmZvJztcblxuLy93aW5zdG9uLmVtaXRFcnJzID0gdHJ1ZTtcblxuLy8gQ3JlYXRlIHRoZSBsb2cgZGlyZWN0b3J5IGlmIGl0IGRvZXMgbm90IGV4aXN0XG5pZiAoIWZzLmV4aXN0c1N5bmMobG9nRGlyKSkge1xuICBmcy5ta2RpclN5bmMobG9nRGlyKTtcbn1cblxuY29uc3QgdHNGb3JtYXQgPSAoKSA9PiAobmV3IERhdGUoKSkudG9Mb2NhbGVUaW1lU3RyaW5nKCk7XG5cbi8vY29uc3QgbG9nZ2VyID0gbmV3ICh3aW5zdG9uLkxvZ2dlcikoe1xuLy8gIHRyYW5zcG9ydHM6IFtcbi8vICAgIC8vIGNvbG9yaXplIHRoZSBvdXRwdXQgdG8gdGhlIGNvbnNvbGVcbi8vICAgIG5ldyAod2luc3Rvbi50cmFuc3BvcnRzLkNvbnNvbGUpKHtcbi8vICAgICAgdGltZXN0YW1wOiB0c0Zvcm1hdCxcbi8vICAgICAgY29sb3JpemU6IHRydWUsXG4vLyAgICAgIGxldmVsOiBsb2dMZXZlbCxcbi8vICAgIH0pLFxuLy8gICAgbmV3IChyZXF1aXJlKCd3aW5zdG9uLWRhaWx5LXJvdGF0ZS1maWxlJykpKHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBnbG9iYWwtcmVxdWlyZVxuLy8gICAgICBmaWxlbmFtZTogYCR7bG9nRGlyfS8tcmVzdWx0cy5sb2dgLFxuLy8gICAgICB0aW1lc3RhbXA6IHRzRm9ybWF0LFxuLy8gICAgICBkYXRlUGF0dGVybjogJ3l5eXktTU0tZGQnLFxuLy8gICAgICBwcmVwZW5kOiB0cnVlLFxuLy8gICAgICBsZXZlbDogbG9nTGV2ZWwsXG4vLyAgICB9KSxcbi8vICBdLFxuLy99KTtcbi8vXG4vL2xvZ2dlci5kZWJ1ZygnRGVidWdnaW5nIGluZm8nKTtcbi8vbG9nZ2VyLnZlcmJvc2UoJ1ZlcmJvc2UgaW5mbycpO1xuLy9sb2dnZXIuaW5mbygnSGVsbG8gd29ybGQnKTtcbi8vbG9nZ2VyLndhcm4oJ1dhcm5pbmcgbWVzc2FnZScpO1xuLy9sb2dnZXIuZXJyb3IoJ0Vycm9yIGluZm8nKTtcbi8vXG4vL21vZHVsZS5leHBvcnRzID0gbG9nZ2VyO1xuLy9tb2R1bGUuZXhwb3J0cy5zdHJlYW0gPSB7XG4vLyAgd3JpdGUobWVzc2FnZSwgZW5jb2RpbmcpIHtcbi8vICAgIGxvZ2dlci5pbmZvKG1lc3NhZ2UpO1xuLy8gIH0sXG4vL307XG5cbmNvbnN0IGxvZ2dlciA9IHt9O1xuXG5sb2dnZXIucm91dGVMb2dnZXIgPSBleHByZXNzV2luc3Rvbi5sb2dnZXIoe1xuICB0cmFuc3BvcnRzOiBbXG4gICAgbmV3IHdpbnN0b24udHJhbnNwb3J0cy5Db25zb2xlKHtcbiAgICAgIGpzb246IHRydWUsXG4gICAgICBjb2xvcml6ZTogdHJ1ZSxcbiAgICB9KSxcbiAgICBuZXcgKHJlcXVpcmUoJ3dpbnN0b24tZGFpbHktcm90YXRlLWZpbGUnKSkoeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGdsb2JhbC1yZXF1aXJlXG4gICAgICBmaWxlbmFtZTogYCR7bG9nRGlyfS8tcmVzdWx0cy5sb2dgLFxuICAgICAgdGltZXN0YW1wOiB0c0Zvcm1hdCxcbiAgICAgIGRhdGVQYXR0ZXJuOiAneXl5eS1NTS1kZCcsXG4gICAgICBwcmVwZW5kOiB0cnVlLFxuICAgICAgbGV2ZWw6IGxvZ0xldmVsLFxuICAgIH0pLFxuICBdLFxuICBtZXRhOiB0cnVlLCAvLyBjb250cm9sIHdoZXRoZXIgeW91IHdhbnQgdG8gbG9nIHRoZSBtZXRhIGRhdGEgYWJvdXQgdGhlIHJlcXVlc3RcbiAgbXNnOiAnSFRUUCB7e3Jlcy5zdGF0dXNDb2RlfX0ge3tyZXEubWV0aG9kfX0ge3tyZXEudXJsfX0nLCAvLyB7e3Jlcy5yZXNwb25zZVRpbWV9fW1zXG4gIGV4cHJlc3NGb3JtYXQ6IHRydWUsIC8vIFVzZSB0aGUgZGVmYXVsdCBFeHByZXNzL21vcmdhbiByZXF1ZXN0IGZvcm1hdHRpbmcuXG4gIGNvbG9yaXplOiB0cnVlLFxuIC8vIGlnbm9yZVJvdXRlKHJlcSwgcmVzKSB7IHJldHVybiBmYWxzZTsgfSxcbn0pXG5cbmxvZ2dlci5lcnJvckxvZ2dlciA9IGV4cHJlc3NXaW5zdG9uLmVycm9yTG9nZ2VyKHtcbiAgdHJhbnNwb3J0czogW1xuICAgIG5ldyB3aW5zdG9uLnRyYW5zcG9ydHMuQ29uc29sZSh7XG4gICAgICBqc29uOiB0cnVlLFxuICAgICAgY29sb3JpemU6IHRydWUsXG4gICAgfSksXG4gICAgbmV3IChyZXF1aXJlKCd3aW5zdG9uLWRhaWx5LXJvdGF0ZS1maWxlJykpKHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBnbG9iYWwtcmVxdWlyZVxuICAgICAgZmlsZW5hbWU6IGAke2xvZ0Rpcn0vLXJlc3VsdHMubG9nYCxcbiAgICAgIHRpbWVzdGFtcDogdHNGb3JtYXQsXG4gICAgICBkYXRlUGF0dGVybjogJ3l5eXktTU0tZGQnLFxuICAgICAgcHJlcGVuZDogdHJ1ZSxcbiAgICAgIGxldmVsOiBsb2dMZXZlbCxcbiAgICB9KSxcbiAgXSxcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IGxvZ2dlcjtcbiJdfQ==

/***/ },
/* 6 */
/***/ function(module, exports) {

  'use strict';
  
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
      getAll: function getAll(req, res, next) {
        dataAccess.contact.getAll().then(function (contacts) {
          if (contacts.length === 0) {
            sendNullResponse(res, 'No contacts matching parameters');
          } else {
            sendResponse(res, contacts);
          }
        }).catch(function (e) {
          errorHandler(next, e);
        });
      },
      createContact: function createContact(req, res, next) {
        dataAccess.contact.getById(req.params.contact_id).then(function (contact) {
          if (contact) {
            sendConflictResponse(res, 'Contact already exists');
          } else {
            dataAccess.contact.create(req.body).then(function (createdContact) {
              sendResponse(res, createdContact);
            });
          }
        }).catch(function (e) {
          errorHandler(next, e);
        });
      },
      getContact: function getContact(req, res, next) {
        dataAccess.contact.getById(req.params.contact_id).then(function (contact) {
          if (!contact) {
            sendNullResponse(res, 'Contact does not exist');
          } else {
            sendResponse(res, contact);
          }
        }).catch(function (e) {
          errorHandler(next, e);
        });
      },
      updateContact: function updateContact(req, res, next) {
        dataAccess.contact.getById(req.params.contact_id).then(function (contact) {
          if (!contact) {
            sendNullResponse(res, 'Contact does not exist');
          } else {
            dataAccess.contact.updateById(contact.id, contact).then(function (updatedContact) {
              sendResponse(res, updatedContact);
            });
          }
        }).catch(function (e) {
          errorHandler(next, e);
        });
      },
      deleteContact: function deleteContact(req, res, next) {
        dataAccess.contact.getById(req.params.contact_id).then(function (contact) {
          if (!contact) {
            sendNullResponse(res, 'Contact does not exist');
          } else {
            dataAccess.contact.deleteById(req.contact.id).then(function () {
              sendResponse(res, { message: 'success' });
            });
          }
        }).catch(function (e) {
          errorHandler(next, e);
        });
      }
    };
  };
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xccm91dGVzXFx2MVxcY29udGFjdFxcY29udGFjdEN0cmwuanMiXSwibmFtZXMiOlsic2VuZFJlc3BvbnNlIiwicmVzIiwicmVzcG9uc2UiLCJqc29uIiwic2VuZE51bGxSZXNwb25zZSIsImVyciIsInN0YXR1cyIsImVycm9yIiwic2VuZENvbmZsaWN0UmVzcG9uc2UiLCJlcnJvckhhbmRsZXIiLCJuZXh0IiwibW9kdWxlIiwiZXhwb3J0cyIsImNvbnRhY3RDdHJsIiwiZGF0YUFjY2VzcyIsImdldEFsbCIsInJlcSIsImNvbnRhY3QiLCJ0aGVuIiwiY29udGFjdHMiLCJsZW5ndGgiLCJjYXRjaCIsImUiLCJjcmVhdGVDb250YWN0IiwiZ2V0QnlJZCIsInBhcmFtcyIsImNvbnRhY3RfaWQiLCJjcmVhdGUiLCJib2R5IiwiY3JlYXRlZENvbnRhY3QiLCJnZXRDb250YWN0IiwidXBkYXRlQ29udGFjdCIsInVwZGF0ZUJ5SWQiLCJpZCIsInVwZGF0ZWRDb250YWN0IiwiZGVsZXRlQ29udGFjdCIsImRlbGV0ZUJ5SWQiLCJtZXNzYWdlIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7OztBQUtBLFNBQVNBLFlBQVQsQ0FBc0JDLEdBQXRCLEVBQTJCQyxRQUEzQixFQUFxQztBQUNuQ0QsTUFBSUUsSUFBSixDQUFTRCxRQUFUO0FBQ0Q7QUFDRCxTQUFTRSxnQkFBVCxDQUEwQkgsR0FBMUIsRUFBK0JJLEdBQS9CLEVBQW9DO0FBQ2xDSixNQUFJSyxNQUFKLENBQVcsR0FBWCxFQUFnQkgsSUFBaEIsQ0FBcUIsRUFBRUksT0FBT0YsR0FBVCxFQUFyQjtBQUNEO0FBQ0QsU0FBU0csb0JBQVQsQ0FBOEJQLEdBQTlCLEVBQW1DSSxHQUFuQyxFQUF3QztBQUN0Q0osTUFBSUssTUFBSixDQUFXLEdBQVgsRUFBZ0JILElBQWhCLENBQXFCLEVBQUVJLE9BQU9GLEdBQVQsRUFBckI7QUFDRDtBQUNELFNBQVNJLFlBQVQsQ0FBc0JDLElBQXRCLEVBQTRCTCxHQUE1QixFQUFpQztB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aUJBQVdHLE9BQVgsQ0FBbUJPLE9BQW5CLENBQTJCUixJQUFJUyxNQUFKLENBQVdDLFVBQXRDLEVBQWtEUixJQUFsRCxDQUF1RCxVQUFDRCxPQUFELEVBQWE7QUFDbEUsWUFBSSxDQUFDQSxPQUFMLEVBQWM7QUFDWmIsMkJBQWlCSCxHQUFqQixFQUFzQix3QkFBdEI7QUFDRCxTQUZELE1BRU87QUFDTGEscUJBQVdHLE9BQVgsQ0FBbUJtQixVQUFuQixDQUE4QnBCLElBQUlDLE9BQUosQ0FBWWdCLEVBQTFDLEVBQThDZixJQUE5QyxDQUFtRCxZQUFNO0FBQ3ZEbEIseUJBQWFDLEdBQWIsRUFBa0IsRUFBRW9DLFNBQVMsU0FBWCxFQUFsQjtBQUNELFdBRkQ7QUFHRDtBQUNGLE9BUkQsRUFRR2hCLEtBUkgsQ0FRUyxVQUFDQyxDQUFELEVBQU87QUFBRWIscUJBQWFDLElBQWIsRUFBbUJZLENBQW5CO0FBQXdCLE9BUjFDO0FBU0Q7QUFwREksR0FBUDtBQXVERCxDQXhERCIsImZpbGUiOiJjb250YWN0Q3RybC5qcyIsInNvdXJjZVJvb3QiOiJDOi9Vc2Vycy9kY3JlZXkvV2Vic3Rvcm1Qcm9qZWN0cy9yZWMvYXBpIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGRjcmVleSBvbiA4LzMxLzIwMTYuXG4gKiBCdXNpbmVzcyBMb2dpYyBMYXllciBmb3IgQ29udGFjdFxuICovXG5cbmZ1bmN0aW9uIHNlbmRSZXNwb25zZShyZXMsIHJlc3BvbnNlKSB7XG4gIHJlcy5qc29uKHJlc3BvbnNlKTtcbn1cbmZ1bmN0aW9uIHNlbmROdWxsUmVzcG9uc2UocmVzLCBlcnIpIHtcbiAgcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBlcnJvcjogZXJyIH0pO1xufVxuZnVuY3Rpb24gc2VuZENvbmZsaWN0UmVzcG9uc2UocmVzLCBlcnIpIHtcbiAgcmVzLnN0YXR1cyg0MDkpLmpzb24oeyBlcnJvcjogZXJyIH0pO1xufVxuZnVuY3Rpb24gZXJyb3JIYW5kbGVyKG5leHQsIGVycikge1xuICBuZXh0KGVycik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29udGFjdEN0cmwoZGF0YUFjY2Vzcykge1xuICByZXR1cm4ge1xuICAgIGdldEFsbChyZXEsIHJlcywgbmV4dCkge1xuICAgICAgZGF0YUFjY2Vzcy5jb250YWN0LmdldEFsbCgpLnRoZW4oKGNvbnRhY3RzKSA9PiB7XG4gICAgICAgIGlmIChjb250YWN0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBzZW5kTnVsbFJlc3BvbnNlKHJlcywgJ05vIGNvbnRhY3RzIG1hdGNoaW5nIHBhcmFtZXRlcnMnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZW5kUmVzcG9uc2UocmVzLCBjb250YWN0cyk7XG4gICAgICAgIH1cbiAgICAgIH0pLmNhdGNoKChlKSA9PiB7IGVycm9ySGFuZGxlcihuZXh0LCBlKTsgfSk7XG4gICAgfSxcbiAgICBjcmVhdGVDb250YWN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICBkYXRhQWNjZXNzLmNvbnRhY3QuZ2V0QnlJZChyZXEucGFyYW1zLmNvbnRhY3RfaWQpLnRoZW4oKGNvbnRhY3QpID0+IHtcbiAgICAgICAgaWYgKGNvbnRhY3QpIHtcbiAgICAgICAgICBzZW5kQ29uZmxpY3RSZXNwb25zZShyZXMsICdDb250YWN0IGFscmVhZHkgZXhpc3RzJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGF0YUFjY2Vzcy5jb250YWN0LmNyZWF0ZShyZXEuYm9keSkudGhlbigoY3JlYXRlZENvbnRhY3QpID0+IHtcbiAgICAgICAgICAgIHNlbmRSZXNwb25zZShyZXMsIGNyZWF0ZWRDb250YWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSkuY2F0Y2goKGUpID0+IHsgZXJyb3JIYW5kbGVyKG5leHQsIGUpOyB9KTtcbiAgICB9LFxuICAgIGdldENvbnRhY3QocmVxLCByZXMsIG5leHQpIHtcbiAgICAgIGRhdGFBY2Nlc3MuY29udGFjdC5nZXRCeUlkKHJlcS5wYXJhbXMuY29udGFjdF9pZCkudGhlbigoY29udGFjdCkgPT4ge1xuICAgICAgICBpZiAoIWNvbnRhY3QpIHtcbiAgICAgICAgICBzZW5kTnVsbFJlc3BvbnNlKHJlcywgJ0NvbnRhY3QgZG9lcyBub3QgZXhpc3QnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZW5kUmVzcG9uc2UocmVzLCBjb250YWN0KTtcbiAgICAgICAgfVxuICAgICAgfSkuY2F0Y2goKGUpID0+IHsgZXJyb3JIYW5kbGVyKG5leHQsIGUpOyB9KTtcbiAgICB9LFxuICAgIHVwZGF0ZUNvbnRhY3QocmVxLCByZXMsIG5leHQpIHtcbiAgICAgIGRhdGFBY2Nlc3MuY29udGFjdC5nZXRCeUlkKHJlcS5wYXJhbXMuY29udGFjdF9pZCkudGhlbigoY29udGFjdCkgPT4ge1xuICAgICAgICBpZiAoIWNvbnRhY3QpIHtcbiAgICAgICAgICBzZW5kTnVsbFJlc3BvbnNlKHJlcywgJ0NvbnRhY3QgZG9lcyBub3QgZXhpc3QnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkYXRhQWNjZXNzLmNvbnRhY3QudXBkYXRlQnlJZChjb250YWN0LmlkLCBjb250YWN0KS50aGVuKCh1cGRhdGVkQ29udGFjdCkgPT4ge1xuICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHJlcywgdXBkYXRlZENvbnRhY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KS5jYXRjaCgoZSkgPT4geyBlcnJvckhhbmRsZXIobmV4dCwgZSk7IH0pO1xuICAgIH0sXG5cbiAgICBkZWxldGVDb250YWN0KHJlcSwgcmVzLCBuZXh0KSB7XG4gICAgICBkYXRhQWNjZXNzLmNvbnRhY3QuZ2V0QnlJZChyZXEucGFyYW1zLmNvbnRhY3RfaWQpLnRoZW4oKGNvbnRhY3QpID0+IHtcbiAgICAgICAgaWYgKCFjb250YWN0KSB7XG4gICAgICAgICAgc2VuZE51bGxSZXNwb25zZShyZXMsICdDb250YWN0IGRvZXMgbm90IGV4aXN0Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGF0YUFjY2Vzcy5jb250YWN0LmRlbGV0ZUJ5SWQocmVxLmNvbnRhY3QuaWQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHJlcywgeyBtZXNzYWdlOiAnc3VjY2VzcycgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pLmNhdGNoKChlKSA9PiB7IGVycm9ySGFuZGxlcihuZXh0LCBlKTsgfSk7XG4gICAgfSxcblxuICB9O1xufTtcbiJdfQ==

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _contactCtrl = __webpack_require__(6);
  
  var _contactCtrl2 = _interopRequireDefault(_contactCtrl);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function routes(router, dataAccess) {
    var contactController = (0, _contactCtrl2.default)(dataAccess);
  
    router.route('/contacts').get(contactController.getAll).post(contactController.createContact);
  
    router.route('/contacts/:contact_id').get(contactController.getContact).put(contactController.updateContact).delete(contactController.deleteContact);
  } /**
     * Created by dcreey on 8/29/2016.
     * Routing for Contacts
     */
  
  
  module.exports = routes;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyY1xccm91dGVzXFx2MVxcY29udGFjdFxcaW5kZXguanMiXSwibmFtZXMiOlsicm91dGVzIiwicm91dGVyIiwiZGF0YUFjY2VzcyIsImNvbnRhY3RDb250cm9sbGVyIiwicm91dGUiLCJnZXQiLCJnZXRBbGwiLCJwb3N0IiwiY3JlYXRlQ29udGFjdCIsImdldENvbnRhY3QiLCJwdXQiLCJ1cGRhdGVDb250YWN0IiwiZGVsZXRlIiwiZGVsZXRlQ29udGFjdCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBSUE7Ozs7OztBQUVBLFNBQVNBLE1BQVQsQ0FBZ0JDLE1BQWhCLEVBQXdCQyxVQUF4QixFQUFvQztBQUNsQyxNQUFNQyxvQkFBb0IsMkJBQVlELFVBQVosQ0FBMUI7O0FBRUFELFNBQU9HLEtBQVAsQ0FBYSxXQUFiLEVBQ0dDLEdBREgsQ0FDT0Ysa0JBQWtCRyxNQUR6QixFQUVHQyxJQUZILENBRVFKLGtCQUFrQkssYUFGMUI7O0FBSUFQLFNBQU9HLEtBQVAsQ0FBYSx1QkFBYixFQUNHQyxHQURILENBQ09GLGtCQUFrQk0sVUFEekIsRUFFR0MsR0FGSCxDQUVPUCxrQkFBa0JRLGFBRnpCLEVBR0dDLE1BSEgsQ0FHVVQsa0JBQWtCVSxhQUg1QjtBQUlELEMsQ0FqQkQ7Ozs7OztBQW1CQUMsT0FBT0MsT0FBUCxHQUFpQmYsTUFBakIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvZGNyZWV5L1dlYnN0b3JtUHJvamVjdHMvcmVjL2FwaSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBkY3JlZXkgb24gOC8yOS8yMDE2LlxuICogUm91dGluZyBmb3IgQ29udGFjdHNcbiAqL1xuaW1wb3J0IGNvbnRhY3RDdHJsIGZyb20gJy4vY29udGFjdEN0cmwnO1xuXG5mdW5jdGlvbiByb3V0ZXMocm91dGVyLCBkYXRhQWNjZXNzKSB7XG4gIGNvbnN0IGNvbnRhY3RDb250cm9sbGVyID0gY29udGFjdEN0cmwoZGF0YUFjY2Vzcyk7XG5cbiAgcm91dGVyLnJvdXRlKCcvY29udGFjdHMnKVxuICAgIC5nZXQoY29udGFjdENvbnRyb2xsZXIuZ2V0QWxsKVxuICAgIC5wb3N0KGNvbnRhY3RDb250cm9sbGVyLmNyZWF0ZUNvbnRhY3QpO1xuXG4gIHJvdXRlci5yb3V0ZSgnL2NvbnRhY3RzLzpjb250YWN0X2lkJylcbiAgICAuZ2V0KGNvbnRhY3RDb250cm9sbGVyLmdldENvbnRhY3QpXG4gICAgLnB1dChjb250YWN0Q29udHJvbGxlci51cGRhdGVDb250YWN0KVxuICAgIC5kZWxldGUoY29udGFjdENvbnRyb2xsZXIuZGVsZXRlQ29udGFjdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcm91dGVzO1xuIl19

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

  var map = {
  	"./contact.js": 4
  };
  function webpackContext(req) {
  	return __webpack_require__(webpackContextResolve(req));
  };
  function webpackContextResolve(req) {
  	return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
  };
  webpackContext.keys = function webpackContextKeys() {
  	return Object.keys(map);
  };
  webpackContext.resolve = webpackContextResolve;
  module.exports = webpackContext;
  webpackContext.id = 8;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

  var map = {
  	"./v1/contact/index.js": 7
  };
  function webpackContext(req) {
  	return __webpack_require__(webpackContextResolve(req));
  };
  function webpackContextResolve(req) {
  	return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
  };
  webpackContext.keys = function webpackContextKeys() {
  	return Object.keys(map);
  };
  webpackContext.resolve = webpackContextResolve;
  module.exports = webpackContext;
  webpackContext.id = 9;


/***/ },
/* 10 */
/***/ function(module, exports) {

  module.exports = require("bluebird");

/***/ },
/* 11 */
/***/ function(module, exports) {

  module.exports = require("cassandra-driver");

/***/ },
/* 12 */
/***/ function(module, exports) {

  module.exports = require("express");

/***/ },
/* 13 */
/***/ function(module, exports) {

  module.exports = require("express-winston");

/***/ },
/* 14 */
/***/ function(module, exports) {

  module.exports = require("fs");

/***/ },
/* 15 */
/***/ function(module, exports) {

  module.exports = require("winston");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map