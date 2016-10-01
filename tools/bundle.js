/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import Promise from 'bluebird';
import cp from 'child_process';
import path from 'path';
import serverConfig from './server.config';

const config = serverConfig.find(x => x.target === 'node');
const exec = cp.exec;
let cmd = `babel src -d ${config.output.path}`;

if (!config.debug) {
  const compiledPath = path.join(config.output.path, config.output.filename);
  cmd = `babel src -o ${compiledPath}`;
}

/**
 * Creates application bundles from the source files.
 */
function bundle() {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      // command output is in stdout
      if (error) throw new Error(error);
      else if (stderr) throw new Error(stderr);
      else resolve(stdout);
    });
  });
}

export default bundle;
