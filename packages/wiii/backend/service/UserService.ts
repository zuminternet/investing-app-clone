/**
 * @description
 * - 회원가입, login, logout 서비스
 * - `controller/UserController.ts`에서 호출
 */
import { getMongoRepository as getRepository, MongoRepository, getConnection, getCustomRepository } from 'typeorm';
import { Service } from 'zum-portal-core/backend/decorator/Alias';
import { User } from '../db/entity/User.entity';
import { UserRepository } from '../db/repository/user.repository';
import { getMongoConnection, getRedisConnection } from '../db/';

@Service()
export class UserService {
  constructor() {}

  /**
   * - Request 객체에서 회원가입 form 데이터 받아서
   * - DB insert 후 결과 반환
   * @return {boolean} DB 쿼리 결과에 따라 true/void
   */
  public async saveNewUser({ nickname, email, password }) {
    try {
      const result = await getCustomRepository(UserRepository).createUser({ nickname, email, password });
      if (!result) throw new Error(`[saveNewUser] Fail to Save`);
      return true;
    } catch (e) {
      return console.error(e);
    }
  }

  /**
   * login
   *
   */
  public async login({ email, password }) {
    try {
      // const result = await this.repo.comparePW(password);

      console.log({ here: this.login.name });
      // console.info({ result });
      // .then((result) => {
      //   if (!result) throw new Error(`[SignIn] Fail to Compare PWs`);
      // });
    } catch (e) {
      return e;
    }
  }
}
