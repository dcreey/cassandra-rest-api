/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import extend from 'extend';

const DEBUG = !process.argv.includes('--release');
const VERBOSE = process.argv.includes('--verbose');

process.env.NODE_ENV = DEBUG ? 'development' : 'production';
process.env.BABEL_ENV = DEBUG ? 'development' : 'production';
console.log(process.env.BABEL_ENV);
//
// Common configuration chunk to be used for both
// server-side (server.js) bundles
// -----------------------------------------------------------------------------

const config = {
  output: {
    publicPath: '/',
    sourcePrefix: '  ',
  },

  cache: DEBUG,
  debug: DEBUG,

  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE,
  },
};

//
// Configuration for the server-side bundle (server.js)
// -----------------------------------------------------------------------------

const serverConfig = extend(true, {}, config, {
  entry: './src/server.js',
  output: {
    path: './build',
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
});

//
// Configuration for the server-side mocha testing bundle (test.server.js)
// -----------------------------------------------------------------------------

const mochaConfig = extend(true, {}, config, {
  output: {
    filename: 'test.server.js',
    path: 'build/',
  },
});

export default [serverConfig, mochaConfig];
