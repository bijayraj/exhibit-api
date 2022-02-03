# SIU VOG API
This repository contains NodeJS API for Voice on the GO project. 

# Usage
1. Clone this repository
```shell script
git clone git@github.com:bijayraj/siu_vog_api_node.git
```
2. Start express application using npm
```shell script
cd siu_vog_api_node
npm install
npm start
```
Load the api documentation from http://localhost:3000/docs

# Generating database migration
After making changes to models inside ./src/models folder, run
```shell script
npm run db:makemigrations
```
Running 'npm start' runs the sequelize migrate command so the new changes are applied to the database. If you need to manually run the migrations, run:
```shell script
npm run db:migrate
```

# Logging in Swagger
* First execute the login route with username and password! Default username, password is admin, admin.
* From the response body of login, copy the token field.
* In documentation page, click on 'Authorize' and paste the copied token into Bearer 'field' and click login. 
* All routes will be accessible now!
