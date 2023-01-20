import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import MatchModel from './MatchModel';

class Teams extends Model {
  declare id: number;
  declare teamName: string;
}

Teams.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

MatchModel.belongsTo(Teams, { foreignKey: 'homeTeamId', as: 'homeTeam' });
MatchModel.belongsTo(Teams, { foreignKey: 'awayTeamId', as: 'awayTeam' });

Teams.hasMany(MatchModel, { foreignKey: 'homeTeamId', as: 'homeMatches' });
Teams.hasMany(MatchModel, { foreignKey: 'awayTeamId', as: 'awayMatches' });

export default Teams;
