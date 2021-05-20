import { Service } from 'zum-portal-core/backend/decorator/Alias';
import User from '../model/UserModel';

export interface GoogleUserInfo {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  picture: string;
  locale: string;
}

@Service()
export default class UserService {
  constructor() {}

  public async getUserByEmailAndPassword({ email, password }) {
    const user = await User.findOne({ email, password }).lean();
    return user;
  }

  public async createGoogleUser(userInfo: GoogleUserInfo) {
    return await User.findOneAndUpdate(
      { email: userInfo.email },
      { ...userInfo, isGoogleUser: true },
      { upsert: true, new: true },
    ).lean();
  }

  public async createUser({ name, email, password }) {
    const user = await User.findOne({ email }).lean();

    if (user) throw new Error('User already exists');

    return await User.create({ name, email, password });
  }
}
