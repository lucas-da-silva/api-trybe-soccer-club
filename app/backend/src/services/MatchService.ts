// import { IMatchIncludes } from '../interfaces';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';

class MatchService {
  getAll = async (inProgress: string | undefined) => {
    let matches;
    const includeTeamName = [
      { model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
      { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
    ];

    if (inProgress !== undefined) {
      matches = await MatchModel.findAll({
        where: { inProgress: inProgress === 'true' },
        include: includeTeamName,
      });
    } else {
      matches = await MatchModel.findAll({ include: includeTeamName });
    }

    return matches;
  };
}

export default MatchService;
