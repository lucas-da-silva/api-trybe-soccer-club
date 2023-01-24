import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IMatchService } from '../interfaces';

class MatchController {
  constructor(private matchService: IMatchService) {}

  public getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    const matches = await this.matchService.getAll(inProgress as string | undefined);
    res.status(StatusCodes.OK).json(matches);
  };

  public create = async (req: Request, res: Response) => {
    const { status, message } = await this.matchService.create(req.body);
    if (status) return res.status(status).json({ message });
    res.status(StatusCodes.CREATED).json(message);
  };

  public finish = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await this.matchService.finish(id);
    res.status(StatusCodes.OK).json({ message: 'Finished' });
  };

  public update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await this.matchService.update(id, req.body);
    res.status(StatusCodes.OK).end();
  };
}

export default MatchController;
