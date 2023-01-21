import UsersModel from '../database/models/UserModel';

class UsersService {
  login = async (): Promise<string> => {
    const users = await UsersModel.findAll();
    return users;
  };
}

export default UsersService;
