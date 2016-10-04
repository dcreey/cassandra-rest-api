/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import replace from 'replace';
import Promise from 'bluebird';
import serverConfig from './server.config';

const config = serverConfig.find(x => x.target === 'node');
/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */
async function copy() {
  const ncp = Promise.promisify(require('ncp'));

  await Promise.all([
    ncp('package.json', 'build/package.json'),
  ]);

  if (!config.debug) {
    // production script only includes start
    replace({
      regex: /("scripts": {)([^}]*)}/g,
      replacement: '"scripts": { ' +
      '"start": "node server.js" ' +
      '}',
      paths: ['build/package.json'],
      recursive: false,
      silent: false,
    });
  } else {
    // else include all scripts but overwrite start
    replace({
      regex: '"start".*',
      replacement: '"start": "node server.js",',
      paths: ['build/package.json'],
      recursive: false,
      silent: false,
    });
  }
}

export default copy;
