import {
  IError,
  IMatch,
  IMatchService,
  INewMatch,
  IMatchWithTeamName,
} from '../interfaces';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import { MatchValidation } from './validations';

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

  create = async ({
    homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals,
  }: IMatch): Promise<INewMatch | IError> => {
    const teamsAreInvalid = await MatchValidation.validate(homeTeamId, awayTeamId);
    if (teamsAreInvalid.status) return teamsAreInvalid;

    const newMatch = await MatchModel.create({
      homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress: true,
    });
    return { status: null, message: newMatch };
  };

  finish = async (id: number): Promise<void> => {
    await MatchModel.update({ inProgress: false }, { where: { id } });
  };
}

export default MatchService;
