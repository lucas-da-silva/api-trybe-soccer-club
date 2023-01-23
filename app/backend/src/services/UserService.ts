import ILogin from '../interfaces';
import { createToken } from '../utils';
import UserValidation from './validations';

class UsersService {
  login = async ({ email, password }: ILogin): Promise<string> => {
    if (!await UserValidation.validateUser(email, password)) {
      throw new Error('Incorrect email or password');
    }
    return createToken({ email });
  };
}

export default UsersService;
