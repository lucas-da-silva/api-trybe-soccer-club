import { ILeaderboard, IMatchScore, ITeamMatches } from '../interfaces';
import LeaderboardCalculate from './LeaderboardCalculate';

class LeaderboardTeams {
  private static totalPoints = (
    homeMatches: IMatchScore[],
    awayMatches: IMatchScore[],
  ) =>
    LeaderboardCalculate.totalPoints(homeMatches)
    + LeaderboardCalculate.totalPoints(awayMatches, 'away');

  private static totalVictories = (
    homeMatches: IMatchScore[],
    awayMatches: IMatchScore[],
  ) =>
    LeaderboardCalculate.homeTeamWin(homeMatches)
    + LeaderboardCalculate.awayTeamWin(awayMatches);

  private static totalLosses = (
    homeMatches: IMatchScore[],
    awayMatches: IMatchScore[],
  ) =>
    LeaderboardCalculate.awayTeamWin(homeMatches)
    + LeaderboardCalculate.homeTeamWin(awayMatches);

  private static drawMatches = (
    homeMatches: IMatchScore[],
    awayMatches: IMatchScore[],
  ) =>
    LeaderboardCalculate.drawMatches(homeMatches)
    + LeaderboardCalculate.drawMatches(awayMatches);

  private static goalsFavor = (
    homeMatches: IMatchScore[],
    awayMatches: IMatchScore[],
  ) =>
    LeaderboardCalculate.homeTeamGoals(homeMatches)
    + LeaderboardCalculate.awayTeamGoals(awayMatches);

  private static goalsOwn = (
    homeMatches: IMatchScore[],
    awayMatches: IMatchScore[],
  ) =>
    LeaderboardCalculate.awayTeamGoals(homeMatches)
    + LeaderboardCalculate.homeTeamGoals(awayMatches);

  private static totalGames = (
    homeMatches: IMatchScore[],
    awayMatches: IMatchScore[],
  ) =>
    LeaderboardCalculate.totalGames(homeMatches)
    + LeaderboardCalculate.totalGames(awayMatches);

  private static goalsBalance = (
    homeMatches: IMatchScore[],
    awayMatches: IMatchScore[],
  ) =>
    LeaderboardCalculate.goalsBalance(homeMatches)
    + LeaderboardCalculate.goalsBalance(awayMatches, 'away');

  private static efficiency = (
    homeMatches: IMatchScore[],
    awayMatches: IMatchScore[],
  ) =>
    Number(
      (
        (this.totalPoints(homeMatches, awayMatches)
          / (this.totalGames(homeMatches, awayMatches) * 3))
        * 100
      ).toFixed(2),
    );

  public static create = (teams: ITeamMatches[]): ILeaderboard[] =>
    teams.map(({ teamName, homeMatches, awayMatches }) => ({
      name: teamName,
      totalPoints: this.totalPoints(homeMatches, awayMatches),
      totalGames: this.totalGames(homeMatches, awayMatches),
      totalVictories: this.totalVictories(homeMatches, awayMatches),
      totalLosses: this.totalLosses(homeMatches, awayMatches),
      totalDraws: this.drawMatches(homeMatches, awayMatches),
      goalsFavor: this.goalsFavor(homeMatches, awayMatches),
      goalsOwn: this.goalsOwn(homeMatches, awayMatches),
      goalsBalance: this.goalsBalance(homeMatches, awayMatches),
      efficiency: this.efficiency(homeMatches, awayMatches),
    }));
}

export default LeaderboardTeams;
