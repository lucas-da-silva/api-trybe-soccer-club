import { IHomeTeamMatches, IAwayTeamMatches } from '../interfaces';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import { LeaderboardFormat } from '../utils';

class LeaderboardService {
  private homeMatches = {
    model: MatchModel,
    as: 'homeMatches',
    where: { inProgress: false },
    attributes: ['homeTeamGoals', 'awayTeamGoals'],
  };

  private awayMatches = {
    model: MatchModel,
    as: 'awayMatches',
    where: { inProgress: false },
    attributes: ['homeTeamGoals', 'awayTeamGoals'],
  };

  private teamName = 'teamName';

  getHomeTeams = async () => {
    const teams = (await TeamModel.findAll({
      include: this.homeMatches,
      attributes: [this.teamName],
    })) as unknown as IHomeTeamMatches[];
    return LeaderboardFormat.format(teams, 'home');
  };

  getAwayTeams = async () => {
    const teams = (await TeamModel.findAll({
      include: this.awayMatches,
      attributes: [this.teamName],
    })) as unknown as IAwayTeamMatches[];
    return LeaderboardFormat.format(teams, 'away');
  };

  getTeams = async () => {
    const teams = (await TeamModel.findAll({
      include: [this.homeMatches, this.awayMatches],
      attributes: [this.teamName],
    })) as unknown as IAwayTeamMatches[];
    return LeaderboardFormat.format(teams);
  };
}

export default LeaderboardService;
