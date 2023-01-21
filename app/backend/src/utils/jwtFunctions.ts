import jwt from 'jsonwebtoken';
import { Data } from './interfaces/Token';

const secret = process.env.JWT_SECRET || 'mySecret';

const createToken = (data: Data, expiresIn = '1h'): string => {
  const jwtConfig = { expiresIn, algorithm: 'HS256' };
  return jwt.sign({ data }, secret, jwtConfig);
};

const verifyToken = (token: string) => jwt.verify(token, secret);

export { createToken, verifyToken };
