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
    const user = await User.findOne({ email, password });
    return user;
  }

  public async createGoogleUser(userInfo: GoogleUserInfo) {
    const user = await User.findOne({ email: userInfo.email });

    if (user) return user;

    return await User.create({ ...userInfo, isGoogleUser: true }).then(console.log);
  }

  public async createUser({ name, email, password }) {
    const user = await User.findOne({ email });

    if (user) throw new Error('User already exists');

    return await User.create({ name, email, password });
  }
}
