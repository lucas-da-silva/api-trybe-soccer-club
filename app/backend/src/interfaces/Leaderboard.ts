import { IMatchScore } from './Match';

export interface IHomeTeamMatches {
  teamName: string;
  homeMatches: IMatchScore[];
}

export interface IAwayTeamMatches {
  teamName: string;
  awayMatches: IMatchScore[];
}

export interface ITeamMatches extends IHomeTeamMatches, IAwayTeamMatches {}

export interface ILeaderboard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

export interface ILeaderboardService {
  getLeaderboard(): Promise<ILeaderboard[]>
  getLeaderboardHome(): Promise<ILeaderboard[]>
  getLeaderboardAway(): Promise<ILeaderboard[]>
}
