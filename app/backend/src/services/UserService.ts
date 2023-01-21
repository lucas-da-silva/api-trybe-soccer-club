import ILogin from '../interfaces';
import { createToken, getHash } from '../utils';
import UsersModel from '../database/models/UserModel';
import UserValidation from './validations';

class UsersService {
  login = async ({ email, password }: ILogin): Promise<string> => {
    if (!UserValidation.validateUser(email, password)) {
      throw new Error('Incorrect email or password');
    }
    const encryptedPassword = await getHash(password);
    const user = await UsersModel.findOne({ where: { email, password: encryptedPassword } });
    if (!user) {
      throw new Error('Incorrect email or password');
    }
    return createToken({ email });
  };
}

export default UsersService;
