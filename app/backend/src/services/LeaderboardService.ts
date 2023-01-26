import {
  IHomeTeamMatches,
  IAwayTeamMatches,
  ILeaderboard,
  ILeaderboardService,
} from '../interfaces';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import { LeaderboardFormat } from '../utils';

class LeaderboardService implements ILeaderboardService {
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

  getLeaderboard = async () => {
    const teams = (await TeamModel.findAll({
      include: [this.homeMatches, this.awayMatches],
      attributes: [this.teamName],
    })) as unknown as IAwayTeamMatches[];
    return LeaderboardFormat.format(teams);
  };

  getLeaderboardHome = async (): Promise<ILeaderboard[]> => {
    const teams = (await TeamModel.findAll({
      include: this.homeMatches,
      attributes: [this.teamName],
    })) as unknown as IHomeTeamMatches[];
    return LeaderboardFormat.format(teams, 'home');
  };

  getLeaderboardAway = async (): Promise<ILeaderboard[]> => {
    const teams = (await TeamModel.findAll({
      include: this.awayMatches,
      attributes: [this.teamName],
    })) as unknown as IAwayTeamMatches[];
    return LeaderboardFormat.format(teams, 'away');
  };
}

export default LeaderboardService;
