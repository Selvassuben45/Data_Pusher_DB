const { v4: uuidv4 } = require('uuid');
const generateToken = require('../utils/tokenGenerator');

module.exports = (sequelize, DataTypes) => {
  // return sequelize.define("Account", {
    const Account = sequelize.define("Account", {

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    accountId: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      unique: true
    },
    accountName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    appSecret: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: () => generateToken()
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  Account.associate = (models) => {
    Account.hasMany(models.Destination, {
      foreignKey: 'AccountId',
      as: 'Destinations' // Add this alias
    });  };

  return Account;
};
