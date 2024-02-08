'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Session.init({
    user_id: DataTypes.STRING,
    ip_address: DataTypes.STRING,
    user_agent: DataTypes.STRING,
    payload: DataTypes.STRING,
    last_activity: DataTypes.DATE
  }, {
    sequelize,
    underscored: true,
    tableName: 'sessions',
    modelName: 'Session'
  });
  return Session;
};