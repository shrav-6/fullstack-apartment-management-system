# External Dependencies

## Installation of Dependencies in LocalHost

We are using Express Node Rest Application in the Backend. Before building and deploying the application , you need to install the following dependencies on your virtual machine.

### Backend

#### Node
- Visit the official [Node.js website](https://nodejs.org/).
- Download Node.js version 18.18.0.
- Install Node.js version 18.8.0 based on your OS.
- Verify the installation by running `node --version` in the terminal.

#### NPM (Node Package Manager)
- Install NPM version 9.8.1.
  - For Linux:
    ```bash
    sudo apt update
    sudo apt install npm
    ```
  - For Windows, download the [npm-setup.exe](https://github.com/npm/cli/releases) from NPM GitHub Releases and install it.
  - For macOS:
    ```bash
    brew install npm
    ```
- Confirm the installation by running `npm --version`.

#### External Dependencies (from `backend/package.json`)
```json
{
  "dependencies": {
    "bcrypt": "^5.0.1",
    "cookie-parser": "^1.4.5",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.2",
    "multer": "^1.4.5-lts.1",
    "mysql": "^2.2.5",
    "mysql2": "^3.6.1",
    "nodemon": "^2.0.7",
    "sequelize": "^6.33.0",
    "sequelize-cli": "^6.2.0"
  }
}

  ```
- **bcrypt:** Library for hashing passwords.
- **cookie-parser:** Middleware for parsing cookies in Express applications.
- **cors:** Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express.
- **express:** Fast, unopinionated, minimalist web framework for Node.js.
- **jsonwebtoken:** JSON Web Token (JWT) implementation for Node.js.
- **multer:** Middleware for handling multipart/form-data, primarily used for file uploads.
- **mysql2:** MySQL library for Node.js, an alternative to the original MySQL package.
- **nodemon:** Utility that monitors changes in your source code and automatically restarts your server.
- **sequelize:** Promise-based Node.js ORM (Object-Relational Mapping) for MySQL, PostgreSQL, SQLite, and MSSQL.
- **sequelize-cli:** Command-Line Interface for Sequelize, used for database migrations and other tasks related to Sequelize.


To install these dependencies:

1. Run `npm install` in the terminal, in  the folder level of `backend/package.json`.
2. Install individual packages using `npm install package-name@version`.


### Backend-Testing


#### External Dependencies (from `backend/package.json`)
```json
{
   "devDependencies": {
   
    "jest": "^29.7.0",
    "sequelize": "^6.34.0",
    "sequelize-mock": "^0.10.2",
    "supertest": "^6.3.3"
  }
}

  ```
- **jest:** Installs the Jest testing framework.
- **sequelize:**  It is used for handling database operations and mapping database entries to JavaScript objects in an easy and efficient way.
- **sequelize-mock:** Includes Sequelize Mock for mocking database behavior during testing
- **supertest:** Adds the Supertest library for testing HTTP requests.


To install these dependencies:

1. Run `npm install` in the terminal, in  the folder level of `backend/package.json`.
2. Install individual packages using `npm install package-name@version`.


### Database

We use MySQL as database server. Install the latest version from the official [MySQL website](https://dev.mysql.com/downloads/installer/), based on your OS.

We are using Sequelize and Sequelize CLI as the Object Relational Mapper.

To Intialize a sequelize project,You can use the following command inside the backend folder:

    ```bash
    npx sequelize-cli init
    ```

This will create a config, models, migrations, and seeders folder in your project.

### Editing the configuration file for Database

Open the backend/config/config.json file and configure your database connection settings.


```json
{
   // backend/config/config.json
    {
  "development": {
    "username": "your_username",
    "password": "your_password",
    "database": "your_database",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  // ... (similar configurations for other environments)

    }
}

  ```




### Frontend

We use React, a JavaScript library for building user interfaces. For running a React project, you need Node and Yarn.

#### Node
- Follow the procedures on the official [Node.js website](https://nodejs.org/).
- Download Node.js version 18.18.0.
- Install Node.js version 18.8.0 based on your OS.
- Verify the installation by running `node --version` in the terminal.


You can create a React project using the command:

```bash
npx create-react-app my-react-app
```

#### External Dependencies (from `frontend/package.json`)
```

"dependencies":{
  "@emotion/react": "^11.11.1", - A library for using Emotion in React.
  "@emotion/styled": "^11.11.0", - A library for creating styled components with Emotion and React.
  "@material-ui/core": "^4.12.4", - Core components for Material-UI, a popular React UI framework.
  "@mui/icons-material": "^5.14.16", - Material design icons for MUI (formerly Material-UI).
  "@mui/material": "^5.14.15", -  MUI core library for React components that follow Material Design.
  "@mui/styled-engine": "^5.14.15", -  The styled engine for MUI, used for creating styled components.
  "@reduxjs/toolkit": "^1.9.7", -  The official, opinionated, batteries-included toolset for efficient Redux development.
  "antd": "^5.10.2", -  A set of high-quality React components for Ant Design.
  "axios": "^1.6.0", - A Promise based HTTP client for the browser and node.js.
  "bootstrap": "^5.3.2", - The most popular front-end framework for developing responsive, mobile-first projects on the web.
  "modal": "^1.2.0", - A simple modal dialog component for React applications.
  "moment": "^2.29.4", - A JavaScript date library for parsing, validating, manipulating, and formatting dates.
  "react": "^18.0.0", - A JavaScript library for building user interfaces.
  "react-bootstrap": "^2.9.0", - Bootstrap components built with React.
  "react-dom": "^18.0.0", - React package for working with the DOM.
  "react-fuzzy": "^1.3.0", - A React component library for creating fuzzy search boxes.
  "react-icons": "^4.11.0", -  A collection of popular icons that can be used in React applications.
  "react-modal": "^3.16.1", -  Accessible modal dialog component for React.
  "react-redux": "^8.1.3", -  Official React bindings for Redux.
  "react-router-dom": "^6.18.0", -  The DOM bindings for React Router v6.
  "redux-thunk": "^2.4.2", -  Thunk middleware for Redux.
  "styled-components": "^6.1.1" - Visual primitives for the component age, used to style your apps without stress.
  "eslint": "^8.51.0",  - A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.
  "eslint-config-airbnb": "^19.0.4", - This package provides Airbnb's .eslintrc as an extensible shared config.
  "eslint-config-react-app": "^7.0.1", - This package includes the shareable ESLint configuration used by Create React App.
  "eslint-import-resolver-alias": "^1.1.2", -  A simple Node behavior import resolution plugin for ESLint to support alias.
  "eslint-plugin-import": "^2.28.1", - This plugin intends to support linting of ES2015+ (ES6+) import/export syntax, and prevent  issues with misspelling of file paths and import names.
  "eslint-plugin-jsx-a11y": "^6.7.1", -  Static AST checker for a11y rules on JSX elements.
  "eslint-plugin-react": "^7.33.2", -  React specific linting rules for ESLint.
  "eslint-plugin-react-hooks": "^4.6.0", -  ESLint rules for React Hooks.
  "@vitejs/plugin-react": "^4.1.0", - Vite plugin to enable fast Refresh and automatic JSX runtime transform for React.
  "vite": "^4.5.0" - Next Generation Frontend Tooling - It's fast!
}

  ```
