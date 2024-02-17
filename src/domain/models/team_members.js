'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TeamMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TeamMember.belongsTo(models.Team, {
        as: 'team',
        foreignKey: 'team_id'
      });
    }
  }
  TeamMember.init({
    team_id: DataTypes.INTEGER,
    member_id: DataTypes.INTEGER
  }, {
    underscored: true,
    sequelize,
    tableName: 'team_member',
    modelName: 'TeamMember',
  });
  return TeamMember;
};