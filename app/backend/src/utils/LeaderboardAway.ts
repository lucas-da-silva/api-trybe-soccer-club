import { ILeaderboard, IAwayTeamMatches } from '../interfaces';
import LeaderboardCalculate from './LeaderboardCalculate';

class LeaderboardAwayTeams {
  public static create = (teams: IAwayTeamMatches[]): ILeaderboard[] =>
    teams.map(({ teamName, awayMatches }) => ({
      name: teamName,
      totalPoints: LeaderboardCalculate.totalPoints(awayMatches, 'away'),
      totalGames: LeaderboardCalculate.totalGames(awayMatches),
      totalVictories: LeaderboardCalculate.awayTeamWin(awayMatches),
      totalLosses: LeaderboardCalculate.homeTeamWin(awayMatches),
      totalDraws: LeaderboardCalculate.drawMatches(awayMatches),
      goalsFavor: LeaderboardCalculate.awayTeamGoals(awayMatches),
      goalsOwn: LeaderboardCalculate.homeTeamGoals(awayMatches),
      goalsBalance: LeaderboardCalculate.goalsBalance(awayMatches, 'away'),
      efficiency: LeaderboardCalculate.efficiency(awayMatches, 'away'),
    }));
}

export default LeaderboardAwayTeams;
