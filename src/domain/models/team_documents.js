'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TeamDocument extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      TeamDocument.belongsTo(models.Team, {
        as: 'team',
        foreignKey: 'team_id'
      });

    }
  }
  TeamDocument.init({
    team_id: DataTypes.INTEGER,
    access_token: DataTypes.STRING
  }, {
    underscored: true,
    sequelize,
    tableName: 'team_document',
    modelName: 'TeamDocument',
  });
  return TeamDocument;
};