import {
  IHomeTeamMatches,
  IAwayTeamMatches,
  IMatchScore,
  ILeaderboard,
} from '../interfaces';

class LeaderboardFormat {
  private static awayTeamWin = (matches: IMatchScore[]): number =>
    matches.filter(
      ({ homeTeamGoals, awayTeamGoals }) => awayTeamGoals > homeTeamGoals,
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

  private static totalPoints = (
    matches: IMatchScore[],
    where: 'home' | 'away',
  ): number => {
    if (where === 'home') {
      return this.homeTeamWin(matches) * 3 + this.drawMatches(matches);
    }
    if (where === 'away') {
      return this.awayTeamWin(matches) * 3 + this.drawMatches(matches);
    }
    return this.homeTeamWin(matches) * 3 + this.drawMatches(matches);
  };

  private static goalsBalance = (matches: IMatchScore[], where: 'home' | 'away'): number => {
    if (where === 'home') {
      return this.homeTeamGoals(matches) - this.awayTeamGoals(matches);
    }
    if (where === 'away') {
      return this.awayTeamGoals(matches) - this.homeTeamGoals(matches);
    }
    return this.awayTeamGoals(matches) - this.homeTeamGoals(matches);
  };

  private static efficiency = (matches: IMatchScore[], where: 'home' | 'away'): number =>
    (this.totalPoints(matches, where) / (matches.length * 3)) * 100;

  private static sortLeaderboard = (
    leaderboard: ILeaderboard[],
  ): ILeaderboard[] =>
    leaderboard.sort(
      (a, b) =>
        b.totalPoints - a.totalPoints
        || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor
        || b.goalsOwn - a.goalsOwn,
    );

  private static createHome = (teams: IHomeTeamMatches[]): ILeaderboard[] =>
    teams.map(({ teamName, homeMatches }) => ({
      name: teamName,
      totalPoints: this.totalPoints(homeMatches, 'home'),
      totalGames: homeMatches.length,
      totalVictories: this.homeTeamWin(homeMatches),
      totalLosses: this.awayTeamWin(homeMatches),
      totalDraws: this.drawMatches(homeMatches),
      goalsFavor: this.homeTeamGoals(homeMatches),
      goalsOwn: this.awayTeamGoals(homeMatches),
      goalsBalance: this.goalsBalance(homeMatches, 'home'),
      efficiency: Number(this.efficiency(homeMatches, 'home').toFixed(2)),
    }));

  private static createAway = (teams: IAwayTeamMatches[]): ILeaderboard[] =>
    teams.map(({ teamName, awayMatches }) => ({
      name: teamName,
      totalPoints: this.totalPoints(awayMatches, 'away'),
      totalGames: awayMatches.length,
      totalVictories: this.awayTeamWin(awayMatches),
      totalLosses: this.homeTeamWin(awayMatches),
      totalDraws: this.drawMatches(awayMatches),
      goalsFavor: this.awayTeamGoals(awayMatches),
      goalsOwn: this.homeTeamGoals(awayMatches),
      goalsBalance: this.goalsBalance(awayMatches, 'away'),
      efficiency: Number(this.efficiency(awayMatches, 'away').toFixed(2)),
    }));

  public static format = (
    teams: (IHomeTeamMatches | IAwayTeamMatches)[],
    where: 'home' | 'away',
  ): ILeaderboard[] => {
    if (where === 'home') {
      return this.sortLeaderboard(this.createHome(teams as IHomeTeamMatches[]));
    }
    if (where === 'away') {
      return this.sortLeaderboard(this.createAway(teams as IAwayTeamMatches[]));
    }
    return this.createAway(teams as IAwayTeamMatches[]);
  };
}

export default LeaderboardFormat;
