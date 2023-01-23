import { Request, Response, NextFunction } from 'express';
import { IToken } from '../interfaces';
import { verifyToken } from '../utils';

class TokenMiddleware {
  public static validate(
    req: Request,
    _res: Response,
    next: NextFunction,
  ) {
    const token = req.header('Authorization');
    if (!token) throw new Error('Token not found');
    try {
      const decoded = verifyToken(token) as IToken;
      req.body.user = decoded.data.email;
      return next();
    } catch (err) {
      throw new Error('Expired or invalid token');
    }
  }
}

export default TokenMiddleware;
