'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Documents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      Documents.belongsToMany(models.User, {
        through: models.UserDocument, // Change to UserDocuments
        foreignKey: 'document_id',
      });

      Documents.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'id'
      })

    }
  }
  Documents.init({
    access_token: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    path: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    underscored: true,
    modelName: 'Documents',
    tableName: 'documents'
  });
  return Documents;
};