import { Request, Response } from 'express';
import { TeamService } from '../services';

class TeamController {
  constructor(private teamService: TeamService) {}

  public getAll = async (_req: Request, res: Response) => {
    const teams = await this.teamService.getAll();
    res.status(200).json(teams);
  };

  public getOne = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const team = await this.teamService.getOne(id);
    res.status(200).json(team);
  };
}

export default TeamController;
