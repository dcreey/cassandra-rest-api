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

const exec = cp.exec;
const cmd = 'babel -d build src';

/**
 * Creates application bundles from the source files.
 */
function bundle() {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      // command output is in stdout
      if (error) reject(error);
      else if (stderr) reject(stderr);
      else resolve(stdout);
    });
  });
}

export default bundle;
