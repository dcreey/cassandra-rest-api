/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import webpack from 'webpack';
import Promise from 'bluebird';
import run from './run';
import runServer from './runServer';
import webpackConfig from './webpack.config';
import clean from './clean';
import copy from './copy';

/**
 * Launches a development web server with "live reload" functionality -
 * synchronizing URLs, interactions and code changes across multiple devices.
 */
async function start() {
  await run(clean);
  await run(copy.bind(undefined, { watch: true }));
  await new Promise(resolve => {
    // Patch the client-side bundle configurations
    // to enable Hot Module Replacement (HMR) and React Transform
    webpackConfig.filter(x => x.target !== 'node').forEach(config => {
      // config.plugins.push(new webpack.NoErrorsPlugin());
      config
        .module
        .loaders
        .filter(x => x.loader === 'babel-loader');
    });

    const bundler = webpack(webpackConfig);

    let handleServerBundleComplete = () => {
      console.log('Bundle Complete');
      runServer((err) => {
        console.log('Run Complete');
        if (!err) {
          handleServerBundleComplete = runServer;
          return resolve();
        } else {
          console.log(err);
          return resolve();
        }
      });
    };

    bundler.run((err, stats) => { handleServerBundleComplete(); })
      // .plugin('done', () => handleServerBundleComplete());
    console.log('Await bundler');
  });
}

export default start;
