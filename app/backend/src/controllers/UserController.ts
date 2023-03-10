import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IUserService } from '../interfaces';

class UserController {
  constructor(private userService: IUserService) {}

  public login = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const token = await this.userService.login(req.body);
      res.status(StatusCodes.OK).json({ token });
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
      res.status(StatusCodes.OK).json(role);
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
