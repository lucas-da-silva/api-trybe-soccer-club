import { IMatchService, IMatchWithTeamName } from '../interfaces';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';

class MatchService implements IMatchService {
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
      matches = await MatchModel.findAll({
        include: includeTeamName,
      });
    }

    return matches as unknown as IMatchWithTeamName[];
  };
}

export default MatchService;
