'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DocumentPermissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // DocumentPermissions.belongsTo(models.Documents, {
      //   as: 'creator',
      //   foreignKey: 'creator_id'
      // })
    }
  }
  DocumentPermissions.init({
    user_id: DataTypes.INTEGER,
    document_id: DataTypes.INTEGER,
    creator_id: DataTypes.INTEGER,
    can_view: DataTypes.BOOLEAN,
    can_edit: DataTypes.BOOLEAN,
    can_delete: DataTypes.BOOLEAN,
    can_edit: DataTypes.BOOLEAN,
    can_share: DataTypes.BOOLEAN,
    can_download: DataTypes.BOOLEAN,
  }, {
    sequelize,
    underscored: true,
    modelName: 'DocumentPermissions',
    tableName: 'DocumentPermissions'
  });
  return DocumentPermissions;
};