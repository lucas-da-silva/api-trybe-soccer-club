// import { genSalt, hash, compare } from 'bcryptjs';
import { genSalt, hash, compare } from 'bcryptjs';

const getHash = async (data: string): Promise<string> => {
  const salt = await genSalt(10);
  const crypt = await hash(data.toString(), salt);
  return crypt;
};

const getCompare = async (
  data: string,
  cryptData: string,
): Promise<boolean> => compare(data, cryptData);

export { getHash, getCompare };
