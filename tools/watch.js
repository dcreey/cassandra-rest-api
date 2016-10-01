/**
 * Created by dcreey on 10/1/2016.
 */

import gaze from 'gaze';
import Promise from 'bluebird';
import cp from 'child_process';

const path = require('path');

const exec = cp.exec;

function format(time) {
  return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

// use gaze to rebuild watched files
async function watch({ onRebuild } = {}) {
  const watcher = await new Promise((resolve, reject) => {
    gaze('src/**/*.*', (err, val) => err ? reject(err) : resolve(val));
  });
  watcher.on('changed', async (file) => {
    const start = new Date();
    console.log(`[${format(start)}] Starting '${file}'...`);
    const relPath = file.substr(path.join(__dirname, '../src/').length);
    const cmd = `babel src/${relPath} -o build/${relPath}`;
    const isTestFile = file.indexOf('spec') > -1;

    await new Promise((resolve) => {
      exec(cmd, (error, stdout, stderr) => {
        if (error) throw new Error(error);
        else if (stderr) throw new Error(stderr);
        else {
          const end = new Date();
          const time = end.getTime() - start.getTime();
          console.log(`[${format(end)}] Finished Transpiling '${file}' after ${time} ms`);
          if (!isTestFile && onRebuild) onRebuild();
          resolve(stdout);
        }
      });
    });
  });
  if (onRebuild) onRebuild();
}

export default watch;
