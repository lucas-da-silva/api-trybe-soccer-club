import { sign, verify } from 'jsonwebtoken';
import { IData } from '../interfaces/Token';

const secret = process.env.JWT_SECRET || 'mySecret';

class JwtFunctions {
  public static create = (data: IData, expiresIn = '1h'): string => {
    const token = sign({ data }, secret, { algorithm: 'HS256', expiresIn });
    return token;
  };

  public static verify = (token: string) => verify(token, secret);
}

export default JwtFunctions;
