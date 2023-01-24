import { StatusCodes } from 'http-status-codes';
import TeamModel from '../../database/models/TeamModel';
import { IError } from '../../interfaces';

class MatchValidation {
  public static async validateTeams(
    homeTeamId: number,
    awayTeamId: number,
  ): Promise<IError> {
    if (homeTeamId === awayTeamId) {
      return {
        status: StatusCodes.UNPROCESSABLE_ENTITY,
        message: 'It is not possible to create a match with two equal teams',
      };
    }

    const homeTeam = await TeamModel.findOne({ where: { id: homeTeamId } });
    const awayTeam = await TeamModel.findOne({ where: { id: awayTeamId } });

    if (!homeTeam || !awayTeam) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: 'There is no team with such id!',
      };
    }

    return { status: null };
  }

  public static validate = async (
    homeTeamId: number,
    awayTeamId: number,
  ): Promise<IError> => this.validateTeams(homeTeamId, awayTeamId);
}

export default MatchValidation;
