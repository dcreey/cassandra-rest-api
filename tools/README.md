## Build Automation Tools

Based on the React-Starter-Kit tools. Removed webpack and all other front-end dependencies - use babel and gaze for transpiling and watching/rebuilding. 

##### `npm start` (`start.js`)

* Re-builds the output `/build` directory (`build.js`)
* Runs file watcher which re-transpiles and starts server (`watch.js`)
* Launches Node.js server from the compiled output folder (`runServer.js`)

##### `npm run build` (`build.js`)

* Cleans up the output `/build` folder (`clean.js`)
* Copies static files to the output folder (`copy.js`)
* Transpiles application files with babel (`bundle.js`)

##### `npm run deploy` (`deploy.js`)

* Builds the project from source files (`build.js`)
* Pushes the contents of the `/build` folder to a remote server with Git

##### Options

Flag        | Description
----------- | -------------------------------------------------- 
`--release` | Minimizes and optimizes the compiled output
`--verbose` | Prints detailed information to the console

For example:

```sh
$ npm run build -- --release --verbose   # Build the app in production mode
```

or

```sh
$ npm start -- --release                 # Launch dev server in production mode
```

#### Misc

* `server.config.js` - Server configuration for server-side code
* `run.js` - Helps to launch other scripts with `babel-node` (e.g. `babel-node tools/run build`)
* `.eslintrc` - ESLint overrides for built automation scripts
