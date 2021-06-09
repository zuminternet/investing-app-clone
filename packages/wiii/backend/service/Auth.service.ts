import { getCustomRepository } from 'typeorm';
import { Service } from 'zum-portal-core/backend/decorator/Alias';
import { ApiError } from '../utils/error/api';
import { UserRepository } from '../db/repository/User.repository';
import { signToken, verifyToken } from '../utils/auth/jwt';
import { redis } from '../utils/auth/redis';

/**
 * @description
 * - login, logout 서비스
 * - `controller/Auth.controller.ts`에서 호출
 */
@Service()
export class AuthService {
  private error = (msg: string, name: string) => new ApiError(`Fail to ${msg}`, `---Service:Auth:${name}: `);

  constructor() {}

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
      if (!token) throw loginErr();

      const isSessionOK = redis.setValue(`sess:token:${email}`, token);
      if (!isSessionOK) throw loginErr();

      return token;
    } catch (e) {
      return console.error(e);
    }
  }

  /**
   * logout
   */
  public async logout(email: string): Promise<boolean | void> {
    const logoutErr = () => this.error(`Logout`, this.logout.name);
    try {
      const isDeleted = redis.delete(`sess:token:${email}`);
      if (!isDeleted) throw logoutErr();
      return true;
    } catch (e) {
      return console.error(e);
    }
  }
}
