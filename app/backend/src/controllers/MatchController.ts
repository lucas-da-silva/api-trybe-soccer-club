import { Request, Response } from 'express';
import { IMatchService } from '../interfaces';

class MatchController {
  constructor(private matchService: IMatchService) {}

  public getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    const matches = await this.matchService.getAll(inProgress as string | undefined);
    res.status(200).json(matches);
  };
}

export default MatchController;
