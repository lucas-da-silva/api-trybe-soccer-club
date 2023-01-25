import { Request, Response } from 'express';
import { LeaderboardService } from '../services';

class LeaderboardController {
  constructor(private leaderboardSevice: LeaderboardService) {}

  public getHomeTeams = async (req: Request, res: Response) => {
    const leaderboardHomeTeams = await this.leaderboardSevice.getHomeTeams();
    res.status(200).json(leaderboardHomeTeams);
  };
}

export default LeaderboardController;
