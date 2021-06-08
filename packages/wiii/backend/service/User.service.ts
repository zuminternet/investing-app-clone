import {
  getMongoRepository as getRepository,
  getMongoManager as getManager,
  MongoRepository,
  getCustomRepository,
} from 'typeorm';
import { Service } from 'zum-portal-core/backend/decorator/Alias';
import { ApiError } from '../utils/error/api';
import { UserRepository } from '../db/repository/User.repository';

/**
 * @description
 * - 회원 가입 조회 수정 삭제 서비스
 * - `controller/User.controller.ts`에서 호출
 */
@Service()
export class UserService {
  private error: (msg: string, name: string) => ApiError;

  constructor() {
    this.error = (msg, name) => new ApiError(`Fail to ${msg}`, `---Service:${name}: `);
  }

  /**
   * @return DB 쿼리 결과에 따라 true/void
   */
  public async createUser({ nickname, email, password }) {
    const createErr = () => this.error(`Save New User`, this.createUser.name);
    try {
      const result = await getCustomRepository(UserRepository).createUser({ nickname, email, password });
      if (!result) throw createErr();
      return true;
    } catch (e) {
      return console.error(e);
    }
  }

  /**
   * @todo getOneUser
   */

  /**
   * @todo updateUser
   */

  /**
   * @todo deleteUser
   */
}
