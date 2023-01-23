// import { IMatchIncludes } from '../interfaces';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';

class MatchService {
  getAll = async () => {
    const matches = await MatchModel.findAll({
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matches;
  };

  getInProgress = async (inProgress: boolean) => {
    const matches = await MatchModel.findAll({
      where: { inProgress },
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matches;
  };
}

export default MatchService;
