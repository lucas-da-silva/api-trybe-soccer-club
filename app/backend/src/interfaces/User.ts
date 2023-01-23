import { ILogin } from './Login';

export interface IRole {
  role: string;
}

export interface IUser extends IRole {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface IUserService {
  login(login: ILogin): Promise<string | null>;
  validate(email: string): Promise<IRole | null>;
}
