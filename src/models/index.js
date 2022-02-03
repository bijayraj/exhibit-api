const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const config = require('../config');
const sqlite = require('sqlite3');
const {
  json
} = require('sequelize');

const db = {};

// //Create database if it does not exist
// if (!fs.existsSync(config.DB_FILE)) {
//   new sqlite.Database(config.DB_FILE);
// }

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: config.storage
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const modelsDir = path.normalize(`${__dirname}/../models`);

// loop through all files in models directory ignoring hidden files and this file
fs
  .readdirSync(modelsDir)
  .filter(file => file.indexOf('.') !== 0 && file.indexOf('.map') === -1 && file.indexOf('.model.') > -1)
  // import model files and save model names
  .forEach((file) => {
    console.info(`Loading model file ${file}`);


    // const model = sequelize.import(path.join(modelsDir, file));
    const model = require(path.join(modelsDir, file))
    model.init(sequelize, Sequelize)
    db[model.name] = model;
  });

// calling all the associate function, in order to make the association between the models
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Synchronizing any model changes with database.
// sequelize.sync().then((err) => {
//   if (err) {
//     console.error('Database Sync complete with : %j', err);
//   } else console.info('Database synchronized');
// });

// assign the sequelize variables to the db object and returning the db.
module.exports = _.extend({
    sequelize,
    Sequelize,
  },
  db,
);