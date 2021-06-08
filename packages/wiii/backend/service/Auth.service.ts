import { getCustomRepository } from 'typeorm';
import { Service } from 'zum-portal-core/backend/decorator/Alias';
import { ApiError } from '../utils/error/api';
import { UserRepository } from '../db/repository/User.repository';
import { signToken, verifyToken } from '../utils/auth/jwt';
import Redis from '../utils/auth/redis';

/**
 * @description
 * - login, logout 서비스
 * - `controller/Auth.controller.ts`에서 호출
 */
@Service()
export class AuthService {
  private error: (msg: string, name: string) => ApiError;

  constructor() {
    this.error = (msg, name) => new ApiError(`Fail to ${msg}`, `---Service:${name}: `);
  }

  /**
   * login
   */
  public async login({ email, password }): Promise<string | void> {
    const loginErr = () => this.error(`Login`, this.login.name);
    try {
      const repo = getCustomRepository(UserRepository);
      const isValid = await repo.checkValidUser({ email, password });
      if (!isValid) throw loginErr();

      // jwt token -> redis
      const token = signToken({ data: email });
      Redis.setValue(`sess:token:${email}`, token);

      return token;
    } catch (e) {
      return console.error(e);
    }
  }

  /**
   * login
   */
  public async logout({ email }): Promise<string | void> {
    const logoutErr = () => this.error(`Logout`, this.logout.name);
    try {
      const token = signToken({ data: email });
      Redis.delete(`sess:token:${email}`);

      return token;
    } catch (e) {
      return console.error(e);
    }
  }
}
