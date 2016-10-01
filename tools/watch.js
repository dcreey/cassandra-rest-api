/**
 * Created by dcreey on 10/1/2016.
 */

import gaze from 'gaze';
import Promise from 'bluebird';
import cp from 'child_process';

const path = require('path');

const exec = cp.exec;

// use gaze to rebuild watched files
async function watch({ onRebuild }) {
  const watcher = await new Promise((resolve, reject) => {
    gaze('src/**/*.*', (err, val) => err ? reject(err) : resolve(val));
  });
  watcher.on('changed', async (file) => {
    const relPath = file.substr(path.join(__dirname, '../src/').length);
    console.log(relPath);
    const cmd = `babel -d build/${relPath} src/${relPath}`;
    const isTestFile = file.indexOf('spec') > -1;

    await new Promise((resolve, reject) => {
      exec(cmd, (error, stdout, stderr) => {
        if (error) reject(error);
        else if (stderr) reject(stderr);
        else {
          if (!isTestFile) onRebuild();
          resolve(stdout);
        }
      });
    });
  });
}

export default watch;
