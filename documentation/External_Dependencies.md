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

Write the code for Yarn and external dependencies in frontend-----To be continued by Disha



## Installation of Dependencies For Remote server


-------To be continued By Disha
