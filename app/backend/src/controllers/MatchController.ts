import { Request, Response } from 'express';
import { MatchService } from '../services';

class MatchController {
  constructor(private matchService: MatchService) {}

  public getAll = async (_req: Request, res: Response) => {
    const matches = await this.matchService.getAll();
    res.status(200).json(matches);
  };
}

export default MatchController;
