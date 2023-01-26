import { Request, Response } from 'express';
import { ILeaderboardService } from '../interfaces';

class LeaderboardController {
  constructor(private leaderboardSevice: ILeaderboardService) {}

  public getLeaderboard = async (_req: Request, res: Response) => {
    const leaderboard = await this.leaderboardSevice.getLeaderboard();
    res.status(200).json(leaderboard);
  };

  public getLeaderboardHome = async (_req: Request, res: Response) => {
    const leaderboardHome = await this.leaderboardSevice.getLeaderboardHome();
    res.status(200).json(leaderboardHome);
  };

  public getLeaderboardAway = async (_req: Request, res: Response) => {
    const leaderboardAway = await this.leaderboardSevice.getLeaderboardAway();
    res.status(200).json(leaderboardAway);
  };
}

export default LeaderboardController;
