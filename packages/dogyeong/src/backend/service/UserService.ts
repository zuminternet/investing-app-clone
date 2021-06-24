import { Service } from 'zum-portal-core/backend/decorator/Alias';
import User, { UserDoc } from '../model/UserModel';

export interface GoogleUserInfo {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  picture: string;
  locale: string;
}

export interface UserInfo {
  email: string;
  name: string;
  password: string;
}

@Service()
export default class UserService {
  public getUserByEmailAndPassword({ email, password }) {
    return User.findOne({ email, password }).lean<UserDoc>();
  }

  public getUserByEmail(email: string) {
    return User.findOne({ email }).lean<UserDoc>();
  }

  public createGoogleUser(userInfo: GoogleUserInfo) {
    return User.create(userInfo);
  }

  public async createUser({ name, email, password }) {
    const user = await User.findOne({ email }).lean();

    if (user) throw new Error('User already exists');

    return await User.create({ name, email, password });
  }

  public async updateUser({ email, password, name }) {
    const query: { password?: string; name?: string } = {};
    if (password) query.password = password;
    if (name) query.name = name;
    return await User.findOneAndUpdate({ email }, query, { upsert: false, new: true }).lean<UserDoc>();
  }
}
