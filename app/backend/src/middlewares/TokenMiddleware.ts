import { Request, Response, NextFunction } from 'express';
import { IToken } from '../interfaces';
import { JwtFunctions } from '../utils';

class TokenMiddleware {
  public static validate(
    req: Request,
    _res: Response,
    next: NextFunction,
  ) {
    const token = req.header('Authorization');
    if (!token) throw new Error('Token must be a valid token');
    try {
      const decoded = JwtFunctions.verify(token) as IToken;
      req.body.user = decoded.data.email;
      return next();
    } catch (err) {
      throw new Error('Token must be a valid token');
    }
  }
}

export default TokenMiddleware;
