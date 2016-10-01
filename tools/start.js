/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import Promise from 'bluebird';
import run from './run';
import runServer from './runServer';
import clean from './clean';
import copy from './copy';
import watch from './watch';

/**
 * Launches a development web server with "live reload" functionality -
 * synchronizing URLs, interactions and code changes across multiple devices.
 */
async function start() {
  await run(clean);
  await run(copy);
  await run(watch.bind(undefined, { onRebuild: () => {
    runServer(runServer((err, host) => {
      if (!err) {
        console.log(`Server Running with host ${host}`);
      }
    }));
  } }));
}

export default start;
