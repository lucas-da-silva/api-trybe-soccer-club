import { ILeaderboard, IHomeTeamMatches } from '../interfaces';
import LeaderboardCalculate from './LeaderboardCalculate';

class LeaderboardHomeTeams {
  public static create = (teams: IHomeTeamMatches[]): ILeaderboard[] =>
    teams.map(({ teamName, homeMatches }) => ({
      name: teamName,
      totalPoints: LeaderboardCalculate.totalPoints(homeMatches),
      totalGames: LeaderboardCalculate.totalGames(homeMatches),
      totalVictories: LeaderboardCalculate.homeTeamWin(homeMatches),
      totalLosses: LeaderboardCalculate.awayTeamWin(homeMatches),
      totalDraws: LeaderboardCalculate.drawMatches(homeMatches),
      goalsFavor: LeaderboardCalculate.homeTeamGoals(homeMatches),
      goalsOwn: LeaderboardCalculate.awayTeamGoals(homeMatches),
      goalsBalance: LeaderboardCalculate.goalsBalance(homeMatches),
      efficiency: LeaderboardCalculate.efficiency(homeMatches),
    }));
}

export default LeaderboardHomeTeams;
