import { Request, Response } from 'express';
import { LeaderboardService } from '../services';

class LeaderboardController {
  constructor(private leaderboardSevice: LeaderboardService) {}

  public getHomeTeams = async (_req: Request, res: Response) => {
    const leaderboardHomeTeams = await this.leaderboardSevice.getHomeTeams();
    res.status(200).json(leaderboardHomeTeams);
  };

  public getAwayTeams = async (_req: Request, res: Response) => {
    const leaderboardAwayTeams = await this.leaderboardSevice.getAwayTeams();
    res.status(200).json(leaderboardAwayTeams);
  };
}

export default LeaderboardController;
