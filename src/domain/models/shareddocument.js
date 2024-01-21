'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SharedDocument extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SharedDocument.belongsTo(models.Tenant, {
        as: 'tenant',
        foreignKey: 'tenant_id'
      });

      SharedDocument.belongsTo(models.User, {
        as: 'sender',
        foreignKey: 'sender_id'
      })

    }
  }
  SharedDocument.init({
    tenant_id: DataTypes.INTEGER,
    access_token: DataTypes.STRING,
    sender_id: DataTypes.INTEGER,
    receiver_email: DataTypes.STRING,
    state: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'SharedDocument',
  });
  return SharedDocument;
};