<<<<<<< HEAD
# Shelter

## External Dependencies
These are programming languages, frameworks, and other pieces of software required to run the application. A detailed list of dependencies, along with instructions on how to install and configure them are given in the document below:  
[**External Dependencies**](documentation/External_Dependencies.md)

## Build and Deployment
In order for the application to be used by users anywhere in the world, it must be built and deployed onto a server. Detailed instructions on how to deploy the application are given in the document below:  
[**Build and Deployment**](documentation/Build_And_Deployment.md)

## User Scenarios
All of the features provided by the application, as well as the various scenarios of interaction with the app by a user is documented in the file below:  
[**User Scenarios**](documentation/User_Scenarios.md)
=======
# Shelter - A Complete Solution for Managers and Tenants

Shelter is a comprehensive platform designed to foster seamless communication and interaction between Managers and Tenants. The platform encompasses various features tailored to enhance the overall experience for both parties involved.

## Key Features:

### Notices Board:
Tenants can access a dedicated screen to view important notices posted by the building manager. Stay informed about updates, events, and essential announcements.

### NewsFeed:
Stay in the loop with a dynamic NewsFeed feature that provides real-time updates on events and activities within the building. Only Tenants can contribute and engage in community discussions.

### Application Creation:
Empowering Managers, the platform allows them to effortlessly create new property applications. These applications are prominently featured on the public view page and the Home Page for increased visibility.

### Public View Page:
A user-friendly public view page serves as a hub for prospective tenants or Guests to explore new apartment listings. Users can conveniently apply for applications directly from the public view page and also curate a wishlist of preferred listings.

### Application Management:
Managers have the authority to review and manage incoming applications. The platform provides a streamlined process for Managers to approve or reject applications based on specific listing criteria.

### Tenant Dashboard:
Tenants benefit from a personalized dashboard where they can conveniently track rent payments and access their rental agreement. This feature provides a transparent overview of financial transactions and lease details.

## Usage Scenarios:

1. **User Authentication (Sign In, Login, and Logout):**
    - Three user roles: Managers, Tenants, and Landlords.
    - Users are redirected to their respective screens upon successful authentication.
    - Logout redirects users to the sign-in page.

2. **Manager Page:**
    - Managers can edit, view, delete, and add new buildings.
    - Notices, newsfeeds, and listings are accessible through building components.
    - Managers have exclusive rights to post, edit, and delete notices.
    - Newfeeds posted by tenants are visible to the manager.
    - Full control over new listing management, including approval and rejection of applications.

3. **Tenant View:**
    - Tenants can view notices in a specific building.
    - Post, update, delete, and add new newsfeeds visible to other tenants in the same building.
    - Apply for new listings, check application status, and wishlist for future applications.
    - Track rent payment status and access the rental agreement.

4. **Guest View:**
    - Public listings with sorting and filtering options based on parameters such as rent, recentness, and bedroom type.
    - Sign in required for applying to listings or wishlisting.

# Build and Deployment


## Building and Running Application in Localhost

Once you have installed all the dependencies and make the corresponding configuration, you can proceed with building the application.

### **Backend Application**  
For the backend Node Express JS application, navigate to the project backend directory and run the following command to build  and run the the application:  

```node
npm start
```

The configuration is mentioned in backend/package.json

```json
"scripts": {
    "test": "jest",
    "start": "nodemon index.js",
    "serve": "node index.js",
    "test:coverage": "jest --coverage",
  },
  ```

  when you run the command npm start,it will run the command nodemon index.js as mentioned in scripts.

```node
//backend/index.js
db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
  ```

The backend code will run in http://localhost:3001/ (this url will be running and will be mapped with the another port in docker)and will create and initialize all the database Models used in backend.


### **Frontend Application**

For the frontend application, navigate to the project frontend directory and run the following command to build  and run  the application:  

```node
vite build
vite dev
```

The configuration is mentioned in frontend/package.json

```json
 "scripts": {
    "build": "vite build",
    "dev": "vite",
    "build-and-start": "yarn run build && yarn run dev",
    "lint": "eslint .",
    "lint:fix": "eslint --fix ."
  },
  ```

The frontend code will run in http://localhost:5173/ (this url will be running and will be mapped with the another port in docker)

### Running Testcases 

For running backend testing, navigate to the project backend directory and run the following command to build  and run the the application:  

```node
npm test
```

These are the test scripts for backend/package.json

```json
"scripts": {
    "test": "jest",
    "start": "nodemon index.js",
    "serve": "node index.js",
    "test:coverage": "jest --coverage",
  },
  ```

  when you run the command npm test,it will run the command jest for testing as mentioned in scripts.
  
## Building and Running Application in Remote server

Once Docker is installed on the virtual machine, these steps outline how to deploy a node js application using Docker and establish a CI/CD pipeline

### **Step 1**: Creating a Dockerfile
```node
FROM node:latest

RUN apt-get update && apt-get install -y git

WORKDIR /usr/src/app

COPY . .

EXPOSE 3001

ENTRYPOINT ["node", "app.js"]
```
- FROM - This command specifies the base image for the Docker container
- RUN - Updates package lists and installs Git.
- WORKDIR - This sets the working directory within the container to /usr/src/app.
- COPY - This command copies all the files and directories from the current directory to the working directory 
- EXPOSE - This command documents that the container will be listening on port 3001 at runtime
- ENTRYPOINT - This specifies the default command to run when the container starts.
### **Step 2**: Setting up CI/CD pipeline
Pipeline Stages
The .gitlab-ci.yml file defines the following stages:
### **1. Build Stage**
- Consists of two jobs: frontend-build and backend-build.
- Both jobs use Node.js version 16.20.1 as the Docker image.
- frontend-build job:
    - Navigates into the frontend directory.
    - Installs dependencies using yarn.
    - Adds vite using `yarn add`.
    - Runs a production build using `yarn run Build`
- backend-build job:
    - Navigates into the backend directory.
    - Installs dependencies using `npm install`
    - Starts the application using `npm run start`.
### **2. Test Stage**
- Consists of a single job: backend-test.
- Executes tests in the backend directory.
- Builds the backend using `npm run build`.
- Runs tests using `npm run test`.
### **3. Publish Stage**
- Uses docker:latest as the Docker image, and docker:dind as a service
- The job logs into Docker Hub using the provided Docker Hub username and password.
- Builds Docker images for both frontend and backend tagging them with the short Git commit SHA.
- Pushes the Docker images to the Docker Hub repository.
### **4. Deploy Stage**
- Deploys the application to the production server `(IP 172.17.0.237)`.
- Uses alpine:latest as the Docker image.
- Pulls the Docker images for both frontend and backend from Docker Hub.
- Runs new Docker containers for both frontend and backend applications, exposing them on `ports 8073 and 8074` respectively.
- Port 8073 on server maps to port 5173 inside frontend container.
## **Project Access**
5. **Public View:**
    - The public view is visible to any user.
    - Display of new listings with sorting and filtering options.
    - On clicking each apartment listing, users are redirected to the apartment page for details and application (Sign-in required).
    - Another functionality is the wishlist icon, enabling users to save listings for future applications.

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
>>>>>>> mer/main
