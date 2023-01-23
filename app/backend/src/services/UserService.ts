import { ILogin } from '../interfaces';
import { createToken } from '../utils';
import UserValidation from './validations';
import UserModel from '../database/models/UserModel';

class UsersService {
  login = async ({ email, password }: ILogin): Promise<string> => {
    if (!await UserValidation.validateUser(email, password)) {
      throw new Error('Incorrect email or password');
    }
    return createToken({ email });
  };

  validate = async (email: string) => {
    const role = UserModel.findOne({ where: { email }, attributes: ['role'] });
    if (!role) throw new Error('Invalid token');
    return role;
  };
}

export default UsersService;
