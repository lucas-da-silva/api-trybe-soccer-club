import { IError } from './Error';

export interface IMatch {
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
}

export interface IMatchFromDB extends IMatch {
  id: number;
  inProgress: boolean;
}

export interface INewMatch {
  status: null;
  message: IMatchFromDB;
}

export interface IMatchWithTeamName extends IMatchFromDB {
  homeTeam: {
    teamName: string;
  };
  awayTeam: {
    teamName: string;
  };
}

export interface IMatchService {
  getAll(inProgress: string | undefined): Promise<IMatchWithTeamName[]>;
  create(match: IMatch): Promise<INewMatch | IError>;
  finish(id: number): Promise<void>;
}
