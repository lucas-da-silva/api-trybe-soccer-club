import { IMatchScore } from './Match';

export interface ITeamWithMatches {
  teamName: string;
  homeMatches: IMatchScore[];
}

export interface ILeaderboard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number
  efficiency: number;
}
