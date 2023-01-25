import { ITeamWithMatches, IMatchScore, ILeaderboard } from '../interfaces';

class LeaderboardFormat {
  private static homeTeamLoss = (matches: IMatchScore[]): number =>
    matches.filter(
      ({ homeTeamGoals, awayTeamGoals }) => homeTeamGoals < awayTeamGoals,
    ).length;

  private static homeTeamWin = (matches: IMatchScore[]): number =>
    matches.filter(
      ({ homeTeamGoals, awayTeamGoals }) => homeTeamGoals > awayTeamGoals,
    ).length;

  private static drawMatches = (matches: IMatchScore[]): number =>
    matches.filter(
      ({ homeTeamGoals, awayTeamGoals }) => homeTeamGoals === awayTeamGoals,
    ).length;

  private static homeTeamGoals = (matches: IMatchScore[]): number =>
    matches.reduce((total, { homeTeamGoals }) => total + homeTeamGoals, 0);

  private static awayTeamGoals = (matches: IMatchScore[]): number =>
    matches.reduce((total, { awayTeamGoals }) => total + awayTeamGoals, 0);

  private static totalPoints = (matches: IMatchScore[]): number =>
    this.homeTeamWin(matches) * 3 + this.drawMatches(matches);

  private static goalsBalance = (matches: IMatchScore[]): number =>
    this.homeTeamGoals(matches) - this.awayTeamGoals(matches);

  private static efficiency = (matches: IMatchScore[]): number =>
    (this.totalPoints(matches) / (matches.length * 3)) * 100;

  private static sortLeaderboard = (leaderboard: ILeaderboard[]): ILeaderboard[] =>
    leaderboard.sort(
      (a, b) =>
        b.totalPoints - a.totalPoints
        || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor
        || b.goalsOwn - a.goalsOwn,
    );

  private static createHome = (teams: ITeamWithMatches[]): ILeaderboard[] =>
    teams.map(({ teamName, homeMatches }) => ({
      name: teamName,
      totalPoints: this.totalPoints(homeMatches),
      totalGames: homeMatches.length,
      totalVictories: this.homeTeamWin(homeMatches),
      totalLosses: this.homeTeamLoss(homeMatches),
      totalDraws: this.drawMatches(homeMatches),
      goalsFavor: this.homeTeamGoals(homeMatches),
      goalsOwn: this.awayTeamGoals(homeMatches),
      goalsBalance: this.goalsBalance(homeMatches),
      efficiency: Number(this.efficiency(homeMatches).toFixed(2)),
    }));

  public static format = (teams: ITeamWithMatches[]): ILeaderboard[] =>
    this.sortLeaderboard(this.createHome(teams));
}

export default LeaderboardFormat;
