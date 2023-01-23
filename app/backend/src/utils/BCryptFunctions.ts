import { compare } from 'bcryptjs';

class BCryptFunctions {
  public static compare = async (
    data: string,
    cryptData: string,
  ): Promise<boolean> => compare(data, cryptData);
}

export default BCryptFunctions;
