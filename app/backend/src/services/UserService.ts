import ILogin from '../interfaces';
import { createToken } from '../utils/jwtFunctions';
// import UsersModel from '../database/models/UserModel';
import UserValidation from './validations';

class UsersService {
  login = async ({ email, password }: ILogin): Promise<string> => {
    if (!UserValidation.validateUser(email, password)) {
      throw new Error('Incorrect email or password');
    }
    // const users = await UsersModel.findAll();
    return createToken({ email });
  };
}

export default UsersService;
