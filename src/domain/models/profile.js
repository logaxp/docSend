'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      // Define associations here
      Profile.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'user_id',
      });
    }
  }

  Profile.init(
    {
      company: DataTypes.STRING,
      country: DataTypes.STRING,
      city: DataTypes.STRING,
      nitch: DataTypes.STRING,
    },
    {
      sequelize,
      underscored: true,
      modelName: 'Profile',
      tableName: 'profiles',
    }
  );

  return Profile;
};
