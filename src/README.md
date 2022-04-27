To run the code, please install Node.js v14.8 here https://nodejs.org  
Alternatively you can download nvm with following commands  
1. Install curl ```sudo apt install curl ```
2. Install nvm installation script and execute it ```curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash```
3. Execute ```source ~/.bashrc```
4. Finally install node.js ```nvm install v14.8.0```

To install dependencies run ```npm install``` in working directory.
The file for the server configuration is `./src/configs/config.js`. The file for database connection configuration is `./src/configs/db.js`  

Before running the server, you should create database and user defined in database config, or change config file to suit existing environment. You should also run ```npm migration``` to create necessary tables.

Before running tests, you should create test database and test user defined in database config, or change config file to suit existing environment. You should also run ```npm migration:test``` to create necessary tables.

To run tests use ```npm test``` command in working directory.  

To run the server use command ```npm start```.

