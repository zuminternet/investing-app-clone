/**
 * @description
 * - 회원가입, login, logout 서비스
 * - `controller/UserController.ts`에서 호출
 */
import { Service } from 'zum-portal-core/backend/decorator/Alias';

@Service()
export class UserService {
  /**
   * @constructor
   *  - Yml; 로그인 관련 config ?
   */
  constructor() // @Yml('') private UserApi: any
  {
    //
  }

  /**
   * @description
   * - Request 객체에서 회원가입 form 데이터 받아서
   * - DB insert 후 결과 반환
   * - 성공시 return true
   * - 실패시 return false
   * @return {boolean} DB 쿼리 결과
   */
  public async saveNewUser() {
    return;
  }
}
