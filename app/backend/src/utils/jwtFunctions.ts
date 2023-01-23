import { sign, verify } from 'jsonwebtoken';
import { IData } from '../interfaces/Token';

const secret = process.env.JWT_SECRET || 'mySecret';

const createToken = (data: IData, expiresIn = '1h'): string => {
  const token = sign({ data }, secret, { algorithm: 'HS256', expiresIn });
  return token;
};

const verifyToken = (token: string) => verify(token, secret);

export { createToken, verifyToken };
