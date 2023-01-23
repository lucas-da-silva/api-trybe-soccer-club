import { NextFunction, Request, Response } from 'express';
import { JwtFunctions } from '../utils';
import { UserService } from '../services';
import { IToken } from '../interfaces';

class UserController {
  constructor(private userService: UserService) {}

  public login = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const token = await this.userService.login(req.body);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };

  public validate = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const token = req.header('Authorization') as string;
    const { data: { email } } = JwtFunctions.verify(token) as IToken;
    try {
      const role = await this.userService.validate(email);
      res.status(200).json(role);
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
