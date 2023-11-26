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

For the frontend application, navigate to the project frontend directory and run the following command to build  and run the the application:  

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

### **Running Testcases **

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
    - Adds vite using yarn add.
    - Runs a production build using yarn run Build
- backend-build job:
    - Navigates into the backend directory.
    - Installs dependencies using npm.
    - Starts the application using npm run start.
### **2. Test Stage**
- Consists of a single job: backend-test.
- Executes tests in the backend directory.
- Builds the backend using npm run build.
- Runs tests using npm run test.
### **3. Publish Stage**
- Uses docker:latest as the Docker image, and docker:dind as a service
- The job logs into Docker Hub using the provided Docker Hub username and password.
- Builds Docker images for both frontend and backend applications, tagging them with the short Git commit SHA.
- Pushes the Docker images to the Docker Hub repository.
### **4. Deploy Stage**
- Deploys the application to the production server (IP 172.17.0.237).
- Uses alpine:latest as the Docker image.
- Logs into Docker Hub on the server side using the provided Docker Hub username and password.
- Pulls the Docker images for both frontend and backend from Docker Hub.
- Runs new Docker containers for both frontend and backend applications, exposing them on ports 8073 and 8074 respectively.
- Port 8073 on server maps to port 5173 inside frontend container.
## **Project Access**
- Backend: http://172.17.0.237:8074
- Frontend: http://172.17.0.237:8073
