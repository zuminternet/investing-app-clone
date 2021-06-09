import {
  getMongoRepository as getRepository,
  getMongoManager as getManager,
  MongoRepository,
  getCustomRepository,
} from 'typeorm';
import { Service } from 'zum-portal-core/backend/decorator/Alias';
import { ApiError } from '../utils/error/api';
import { UserRepository } from '../db/';

/**
 * @description
 * - 회원 가입 조회 수정 삭제 서비스
 * - `controller/User.controller.ts`에서 호출
 */
@Service()
export class UserService {
  private error = (msg: string, name: string) => new ApiError(`Fail to ${msg}`, `---Service:User:${name}: `);

  constructor() {}

  /**
   * 생성 및 수정
   * @return DB 쿼리 결과에 따라 true/void
   */
  public async createUser({ nickname, email, password }) {
    const createError = () => this.error(`Save New User`, this.createUser.name);
    try {
      const result = await getCustomRepository(UserRepository).createUser({ nickname, email, password });
      if (!result) throw createError();
      return true;
    } catch (e) {
      return console.error(e);
    }
  }

  /**
   * @todo getOneUser
   */

  /**
   * @todo deleteUser
   */
}
