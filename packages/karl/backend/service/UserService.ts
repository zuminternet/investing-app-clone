import { User } from '../model';
import { Service } from 'zum-portal-core/backend/decorator/Alias';

export interface createUserInfo {
  name: string;
  email: string;
  password: string;
  googleId: string;
}

export interface loginUserByEmailInfo {
  email: string;
  password: string;
}

export interface loginUserByGoogleOAuthInfo {
  email: string;
  googleId: string;
}

@Service()
export default class UserService {
  constructor() {}

  public async createUser({ name, email, password, googleId }: createUserInfo) {
    const user = await User.findOne(
      googleId
        ? { googleId }
        : {
            email,
          },
    );

    if (user) {
      throw new Error('User already exists');
    }

    return await User.create(googleId ? { googleId } : { name, email, password });
  }

  public async loginUserByEmail({ email, password }: loginUserByEmailInfo) {
    const user = await User.findOne({ email, password }).lean();

    if (user) {
      return user;
    }

    throw new Error('User not exists (email login)');
  }

  public async loginUserByGoogleOAuth({ googleId }: loginUserByGoogleOAuthInfo) {
    const user = await User.findOne({ googleId }).lean();

    if (user) {
      return user;
    }

    throw new Error('User not exists (Google Auth login)');
  }
}
