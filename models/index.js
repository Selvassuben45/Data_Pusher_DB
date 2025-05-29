<<<<<<< HEAD
const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  port: dbConfig.PORT
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Account = require('./account.model')(sequelize, Sequelize);
db.Destination = require('./destination.model')(sequelize, Sequelize);


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
=======
const sequelize = require('../config/database');
const Account = require('./account');
const Destination = require('./destination');

const initDB = async () => {
  await sequelize.sync({ alter: true });
};

// Destination.initDB(sequelize)
module.exports = { sequelize, Account, Destination, initDB };

// models/index.js
// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const config = require('../config/config');

// const sequelize = new Sequelize(config.database, config.username, config.password, config);

// const db = {};

// fs.readdirSync(__dirname)
//   .filter(file => file !== 'index.js')
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;
>>>>>>> fca309a (sequelize methods)
