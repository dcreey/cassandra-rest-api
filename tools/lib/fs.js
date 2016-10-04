/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import mkdirp from 'mkdirp';
import path from 'path';

const fs = require('fs');

const writeFile = (file, contents) => new Promise((resolve, reject) => {
  fs.writeFile(file, contents, 'utf8', err => err ? reject(err) : resolve());
});

const makeDir = (name) => new Promise((resolve, reject) => {
  mkdirp(name, err => err ? reject(err) : resolve());
});


/**
 * Goes through the given directory to return all files and folders recursively
 * @author Based on Ash Blue ash@blueashes.com implementation
 * @example getFilesRecursive('./folder/sub-folder');
 * @requires Must include the file system module native to NodeJS, ex. var fs = require('fs');
 * @param {string} folder Folder location to search through
 * @param {string} condition Condition to include file - check if file name contains passed string
 * @returns {object} List of all files found matching optional condition
 */
const getFilesRecursive = (folder, condition = '') => {
  const fileContents = fs.readdirSync(folder);
  let fileTree = [];
  let stats;

  fileContents.forEach((fileName) => {
    stats = fs.lstatSync(path.join(folder, fileName));

    if (stats.isDirectory()) {
      fileTree = fileTree.concat(getFilesRecursive(path.join(folder, fileName), condition));
    } else if (fileName.indexOf(condition) > -1 || !condition) {
      fileTree.push({
        dir: folder,
        name: fileName,
      });
    }
  });
  return fileTree;
};


export default { writeFile, makeDir, getFilesRecursive };
