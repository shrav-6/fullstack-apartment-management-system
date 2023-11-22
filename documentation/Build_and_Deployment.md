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
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon index.js",
    "serve": "node index.js"
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

The backend code will run in http://localhost:3001/ and will create and initialize all the database Models used in backend.


### **Frontend Application**


------------To be completed by Disha how to build and run frontend in LocalHost


### **Running Testcases **

------------To be completed by praveen on how to run the testcases in Local system

## Building and Running Application in Remote server

### **Backend Application**

-------------To be completed by Disha

### **Frontend Application**

------------To be completed by Disha
