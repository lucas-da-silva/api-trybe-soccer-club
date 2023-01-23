import { IRole, ILogin, IUserService } from '../interfaces';
import { JwtFunctions } from '../utils';
import UserValidation from './validations';
import UserModel from '../database/models/UserModel';

class UserService implements IUserService {
  login = async ({ email, password }: ILogin): Promise<string | null> => {
    if (!await UserValidation.validateUser(email, password)) {
      throw new Error('Incorrect email or password');
    }
    return JwtFunctions.create({ email });
  };

  validate = async (email: string): Promise<IRole | null> => {
    const role = UserModel.findOne({ where: { email }, attributes: ['role'] });
    if (!role) throw new Error('Invalid token');
    return role;
  };
}

export default UserService;
