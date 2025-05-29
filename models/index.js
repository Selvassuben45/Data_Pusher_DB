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
// db.Account = Account;
// db.Destination = Destination;
db.Account = require('./account.model')(sequelize, Sequelize);
db.Destination = require('./destination.model')(sequelize, Sequelize);

// db.Account.hasMany(db.Destination, { onDelete: 'CASCADE' });
// db.Destination.belongsTo(db.Account);
// Account.hasMany(models.Destination, {
//   foreignKey: 'AccountId',
//   as: 'Destinations'
// });
// Destination.belongsTo(models.Account, {
//   foreignKey: 'AccountId',
//   as: 'Account'
// });
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
