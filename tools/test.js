/**
 * Created by dcreey on 10/4/2016.
 */

import Mocha from 'mocha';
import path from 'path';
import serverConfig from './server.config';
import fs from './lib/fs';

// Instantiate a Mocha instance.
const mocha = new Mocha();
const config = serverConfig.find(x => x.target === 'node');
const testDir = config.output.path;

// Add each .js file to the mocha instance
const tests = fs.getFilesRecursive(testDir, 'spec.js');

console.log(tests);

tests.forEach(x => {
  mocha.addFile(
    path.join(x.dir, x.name)
  );
});

// Run the tests.
mocha.run((failures) => {
  process.on('exit', () => {
    process.exit(failures);  // exit with non-zero status if there were failures
  });
});
