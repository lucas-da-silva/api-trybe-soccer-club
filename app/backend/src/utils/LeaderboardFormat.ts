import {
  IHomeTeamMatches,
  IAwayTeamMatches,
  ILeaderboard,
  ITeamMatches,
} from '../interfaces';
import LeaderboardHome from './LeaderboardHome';
import LeaderboardAway from './LeaderboardAway';
import Leaderboard from './Leaderboard';

class LeaderboardFormat {
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

  public static format = (
    teams: (IHomeTeamMatches | IAwayTeamMatches | ITeamMatches)[],
    where?: 'home' | 'away',
  ): ILeaderboard[] => {
    if (where === 'home') {
      return this.sortLeaderboard(
        LeaderboardHome.create(teams as IHomeTeamMatches[]),
      );
    }
    if (where === 'away') {
      return this.sortLeaderboard(
        LeaderboardAway.create(teams as IAwayTeamMatches[]),
      );
    }
    return this.sortLeaderboard(
      Leaderboard.create(teams as ITeamMatches[]),
    );
  };
}

export default LeaderboardFormat;
