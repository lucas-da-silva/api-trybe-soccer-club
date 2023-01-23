import UserModel from '../../database/models/UserModel';
import { BCryptFunctions } from '../../utils';
import { IUser } from '../../interfaces';

class UserValidation {
  public static validateEmail(email: string): boolean {
    const emailRegex = /\S+@\S+\.\S/;
    return emailRegex.test(email);
  }

  public static async validatePassword(password: string, email: string): Promise<boolean> {
    if (password.length < 6) return false;
    const user: IUser | null = await UserModel.findOne({ where: { email } });
    if (!user) return false;
    const passwordIsValid = await BCryptFunctions.compare(password, user.password);
    if (!passwordIsValid) return false;
    return true;
  }

  public static async validateUser(email: string, password: string): Promise<boolean> {
    return (
      this.validateEmail(email)
      && await this.validatePassword(password, email)
    );
  }
}

export default UserValidation;
