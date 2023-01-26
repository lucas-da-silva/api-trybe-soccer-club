import { IMatchScore } from '../interfaces';

class LeaderboardCalculate {
  public static awayTeamWin = (matches: IMatchScore[]): number =>
    matches.filter(
      ({ homeTeamGoals, awayTeamGoals }) => awayTeamGoals > homeTeamGoals,
    ).length;

  public static homeTeamWin = (matches: IMatchScore[]): number =>
    matches.filter(
      ({ homeTeamGoals, awayTeamGoals }) => homeTeamGoals > awayTeamGoals,
    ).length;

  public static drawMatches = (matches: IMatchScore[]): number =>
    matches.filter(
      ({ homeTeamGoals, awayTeamGoals }) => homeTeamGoals === awayTeamGoals,
    ).length;

  public static homeTeamGoals = (matches: IMatchScore[]): number =>
    matches.reduce((total, { homeTeamGoals }) => total + homeTeamGoals, 0);

  public static awayTeamGoals = (matches: IMatchScore[]): number =>
    matches.reduce((total, { awayTeamGoals }) => total + awayTeamGoals, 0);

  public static totalPoints = (
    matches: IMatchScore[],
    where?: 'away',
  ): number => {
    if (where === 'away') {
      return this.awayTeamWin(matches) * 3 + this.drawMatches(matches);
    }
    return this.homeTeamWin(matches) * 3 + this.drawMatches(matches);
  };

  public static totalGames = (matches: IMatchScore[]): number => matches.length;

  public static goalsBalance = (
    matches: IMatchScore[],
    where?: 'away',
  ): number => {
    if (where === 'away') {
      return this.awayTeamGoals(matches) - this.homeTeamGoals(matches);
    }
    return this.homeTeamGoals(matches) - this.awayTeamGoals(matches);
  };

  public static efficiency = (matches: IMatchScore[], where?: 'away'): number =>
    Number(
      (
        (this.totalPoints(matches, where) / (this.totalGames(matches) * 3))
        * 100
      ).toFixed(2),
    );
}

export default LeaderboardCalculate;
