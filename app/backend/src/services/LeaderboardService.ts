import { IHomeTeamMatches, IAwayTeamMatches } from '../interfaces';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import { LeaderboardFormat } from '../utils';

class LeaderboardService {
  getHomeTeams = async () => {
    const teams = (await TeamModel.findAll({
      include: {
        model: MatchModel,
        as: 'homeMatches',
        where: { inProgress: false },
        attributes: ['homeTeamGoals', 'awayTeamGoals'],
      },
      attributes: ['teamName'],
    })) as unknown as IHomeTeamMatches[];
    const leaderboard = LeaderboardFormat.format(teams, 'home');
    return leaderboard;
  };

  getAwayTeams = async () => {
    const teams = (await TeamModel.findAll({
      include: {
        model: MatchModel,
        as: 'awayMatches',
        where: { inProgress: false },
        attributes: ['homeTeamGoals', 'awayTeamGoals'],
      },
      attributes: ['teamName'],
    })) as unknown as IAwayTeamMatches[];
    const leaderboard = LeaderboardFormat.format(teams, 'away');
    return leaderboard;
  };
}

export default LeaderboardService;
