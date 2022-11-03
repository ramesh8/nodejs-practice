# nodejs-practice

## Node.js Installation

1. Download Node.js from https://nodejs.org/en/download/
2. Run the installer and finish the installation
3. Create a new folder for your nodejs project
4. Open terminal and change directory to your project folder
5. run `npm init -y` to initialize your project module
6. create `index.js` file in project folder
7. write your code in index.js
   e.g.:
   `console.log('Hello World');`
8. Open terminal and run `node .`, it will run the code in index.js

## Using NPM

NPM is package manager for javascript modules. It comes bundled with node.js, so you can use it right away after you install node.js

1. Open terminal, run `npm -init y` (if not done previously)
2. To **install** a specific package, run `npm i package-name` or `npm install package-name` for example to install express run `npm i express`
3. Run `npm help` for list of npm commands
4. Run `npm view package-name` to see more information of specified package. e.g.: `npm view express`
5. Run `npm view package-name versions` to see the list of versions available for the specified package. e.g.: `npm view express versions`
6. To **install a specific version** of a package using npm, run `npm i package-name@version`. e.g.: `npm i express@4.18.1`
7. To uninstall a package, run `npm uninstall package-name`

## Using NVM

Node Version Manager (NVM), is a tool for managing node.js versions. It helps us to maintain different versions of node.js for different projects using different node.js versions on same device, with out hassle of uninstalling and installing.

### NVM Installation

NVM is available on Linux and Mac devices, but a similar tool is available for windows platform at https://github.com/coreybutler/nvm-windows.

1. Download and install nvm from https://github.com/coreybutler/nvm-windows/releases
2. Run `nvm list` on terminal (need to run as administrator) to see the list of node.js versions that are currently installed on your device.
3. To **install** a specific version of node.js, run nvm install vX.Y.Z where X.Y.Z is the version of node.js. e.g.: `nvm install v18.12.0`
4. Run nvm use vX.Y.Z to switch to specific node.js version. e.g.: `nvm use v18.12.0`
5. To **uninstall** a specific version of node.js, run nvm uninstall vX.Y.Z where X.Y.Z is the version of node.js. e.g.: `nvm uninstall v18.12.0`

## Installing and Using Express

Express is a web framework for node.js, it can be used to create web applications or APIs.

1. open terminal, run `npm init -y` (if not done yet previously)
2. Run `npm i express` in terminal to install express
3. create index.js in project folder and add the following code.

` const express = require("express"); const app = express(); app.get('\',(req,res)=> { res.send('<h1>Hello World</h1>'); }); app.listen(5000, () => console.log("listening on port 5000\nvisit localhost:5000 on your browser...") );`

4. Run `node .` on terminal
5. Open a browser, type `http:\\localhost:5000\` press enter.

6. you need to halt and re-run `node .` command every time you make changes to your server (index.js). So its a good idea to use nodemon to watch your project and re-run the server whenever changes are made.

7. install nodemon using npm, by running the command `npm i nodemon` on terminal

8. Now instead of `node .` you can run `nodemon .` to run the server.

9. if `nodemon .` fails to run you can use `npx nodemon .` command to install and run nodemon
