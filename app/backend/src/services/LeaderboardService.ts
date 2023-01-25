import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';

class LeaderboardService {
  getHomeTeam = async () => {
    const leaderboardHomeTeams = await MatchModel.findAll({
      include: [
        { model: TeamModel, as: 'homeTeam' },
      ],
    });
    return leaderboardHomeTeams;
  };
}

export default LeaderboardService;
