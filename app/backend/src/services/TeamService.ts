import { ITeam } from '../interfaces';
import TeamModel from '../database/models/TeamModel';

class TeamService {
  getAll = async (): Promise<ITeam[]> => {
    const teams = await TeamModel.findAll();
    return teams;
  };

  getOne = async (id: number): Promise<ITeam> => {
    const team = await TeamModel.findOne({ where: { id } }) as ITeam;
    return team;
  };
}

export default TeamService;
