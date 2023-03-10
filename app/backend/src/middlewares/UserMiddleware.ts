import { Response, Request, NextFunction } from 'express';

class UserMiddleware {
  public static validateFields(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Response | void {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    next();
  }
}

export default UserMiddleware;
