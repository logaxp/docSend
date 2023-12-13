'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Document_permissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Document_permissions.belongsTo(models.Templates)
    }
  }
  Document_permissions.init({
    document_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER,
    can_view: DataTypes.BOOLEAN,
    can_edit: DataTypes.BOOLEAN
  }, {
    sequelize,
    underscored: true,
    modelName: 'Document_permissions',
    tableName: 'Permissions'
  });
  return Document_permissions;
};