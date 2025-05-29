const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const crypto = require('crypto');

const Account = sequelize.define('Account', {
  accountId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  accountName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  appSecretToken: {
    type: DataTypes.STRING,
    defaultValue: () => crypto.randomBytes(32).toString('hex')
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Account;
