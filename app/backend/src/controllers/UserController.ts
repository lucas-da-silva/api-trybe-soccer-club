import { Request, Response } from 'express';
import UserService from '../services';

class UserController {
  constructor(private userService: UserService) {}

  public login = async (
    req: Request,
    res: Response,
  ) => {
    try {
      const token = await this.userService.login(req.body);
      res.status(201).json({ token });
    } catch (error) {
      res.status(400).json(error);
    }
  };
}

export default UserController;
