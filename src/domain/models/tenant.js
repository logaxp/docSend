'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tenant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tenant.hasMany(models.User, {
        as: 'user',
        foreignKey: 'id'
      });
    }
  }
  Tenant.init({
    tenant_name: DataTypes.STRING
  }, {
    sequelize,
    underscored: true,
    modelName: 'Tenant',
    tableName: 'Tenants'
  });
  return Tenant;
};