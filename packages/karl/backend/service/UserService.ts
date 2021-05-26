import { User } from '../model';
import { Service } from 'zum-portal-core/backend/decorator/Alias';

export interface createUserInfo {
  name: string;
  email: string;
  password: string;
}

export interface loginUserByEmailInfo {
  email: string;
  password: string;
}

@Service()
export default class UserService {
  constructor() {}

  public async createUser({ name, email, password }: createUserInfo) {
    console.log(name, email, password);
    const user = await User.findOne({
      $or: [{ name, email }],
    });

    if (user) {
      throw new Error('User already exists');
    }

    return await User.create({ name, email, password });
  }

  public async loginUserByEmail({ email, password }: loginUserByEmailInfo) {
    // console.log(email, password, 'call');
    const user = await User.findOne({ email, password }).lean();

    if (user) {
      return user;
    }

    throw new Error('User not exists');
  }
}
