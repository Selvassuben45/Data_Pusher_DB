module.exports = (sequelize, DataTypes) => {
  const Destination = sequelize.define("Destination", {
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
      allowNull: true
    },
    AccountId: {
      type: DataTypes.INTEGER, // or UUID if your Account's primary key is UUID
      allowNull: false,
      references: {
        model: 'Accounts', // This should be the table name
        key: 'id', // This should be the primary key column name in the Accounts table
      }
    }
  });

  Destination.associate = (models) => {
    Destination.belongsTo(models.Account, {
      foreignKey: 'AccountId',
      as: 'Account'
    });
  };

  return Destination;
};
