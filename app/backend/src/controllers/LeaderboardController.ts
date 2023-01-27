import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ILeaderboardService } from '../interfaces';

class LeaderboardController {
  constructor(private leaderboardSevice: ILeaderboardService) {}

  public getLeaderboard = async (_req: Request, res: Response) => {
    const leaderboard = await this.leaderboardSevice.getLeaderboard();
    res.status(StatusCodes.OK).json(leaderboard);
  };

  public getLeaderboardHome = async (_req: Request, res: Response) => {
    const leaderboardHome = await this.leaderboardSevice.getLeaderboardHome();
    res.status(StatusCodes.OK).json(leaderboardHome);
  };

  public getLeaderboardAway = async (_req: Request, res: Response) => {
    const leaderboardAway = await this.leaderboardSevice.getLeaderboardAway();
    res.status(StatusCodes.OK).json(leaderboardAway);
  };
}

export default LeaderboardController;
