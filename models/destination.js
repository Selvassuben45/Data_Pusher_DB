const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
// const sequelize = require(sequelize); // Adjust based on your setup

const Destination = sequelize.define('Destination', {
  accountId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  httpMethod: {
    type: DataTypes.STRING,
    allowNull: false
  },
  headers: {
    type: DataTypes.JSON,
    allowNull: false
  }
});

module.exports = Destination;