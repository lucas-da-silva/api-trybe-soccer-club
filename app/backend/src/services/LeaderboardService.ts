import { ITeamWithMatches } from '../interfaces';
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
    })) as unknown as ITeamWithMatches[];
    const leaderboard = LeaderboardFormat.format(teams);
    return leaderboard;
  };
}

export default LeaderboardService;
