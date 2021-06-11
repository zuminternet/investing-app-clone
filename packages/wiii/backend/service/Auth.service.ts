import { getCustomRepository } from 'typeorm';
import { Service } from 'zum-portal-core/backend/decorator/Alias';
import { ApiError } from '../utils/error/api';
import { UserRepository } from '../db/';

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
  public async login({ email, password }): Promise<boolean | void> {
    const loginErr = () => this.error(`Login`, this.login.name);
    try {
      const repo = getCustomRepository(UserRepository);
      const isValid = await repo.checkValidUser({ email, password });
      if (!isValid) throw loginErr();

      return true;
    } catch (e) {
      return console.error(e);
    }
  }
}
