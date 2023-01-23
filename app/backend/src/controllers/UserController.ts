import { NextFunction, Request, Response } from 'express';
import UserService from '../services';

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
    try {
      const role = await this.userService.validate(req.body.user);
      res.status(200).json(role);
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
