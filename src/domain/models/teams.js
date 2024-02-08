'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Team.hasMany(models.TeamMember, {
        as: 'team',
        foreignKey: 'team_id'
      });

      Team.hasMany(models.TeamDocument, {
        as: 'teams',
        foreignKey: 'team_id'
      });

      Team.belongsTo(models.Tenant, {
        as: 'tenant_team',
        foreignKey: 'tenant_id'
      });

    }
  }
  Team.init({
    name: DataTypes.STRING,
    creator_id: DataTypes.INTEGER,
    tenant_id: DataTypes.INTEGER,
    delete: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Team',
    underscored: true,
    tableName: 'team',
  });
  return Team;
};