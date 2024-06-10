# IBudget-Frontend 🖼️

Welcome to the documentation for the IBudget front end project.

## Setting up the project
Run `npm install` to install the packages.
### Configuring start up script
You will need to change the contents of `node_modules/react-scripts/config/paths.js`<br>
There will exists three lines that look like `appIndexJs: resolveModule(resolveApp, 'src/index'),`<br>
And you will need to change it to `appIndexJs: resolveModule(resolveApp, 'src/main')`<br>
### Running the application
In the terminal execute `npm start` to start this react project.