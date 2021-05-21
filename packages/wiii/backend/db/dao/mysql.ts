/**
 * MySQL DAO
 * @description
 * - 회원가입 및 최근 로그인 datetime 정보 저장
 * - 로그인; 등록된, 유효한 사용자인지 확인 -> middleware로 사용, JWT 발급
 * - email 중복 체크
 * - 회원 탈퇴
 * - TypeORM 사용해 User 모델 관리
 */
import { Connection, getConnection } from 'typeorm';
import { CheckUserProps, CreateUserProps } from '../types';
import { DBName } from '$/config/db';

export default class MySQL {
  private conn: Connection;

  constructor() {
    this.conn = getConnection(DBName.mysql);
  }

  /**
   * checkDuplicated; email 중복 체크
   * @param email
   * @returns 중복 여부; 중복이 아니면 true, 중복이거나 에러인 경우 false
   */
  public static async checkDuplicated(email: string): Promise<boolean> {
    try {
      /**
       * @todo
       * 중복 체크 로직 구현, TypeORM
       */
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  /**
   * createUser; User 생성
   * - UserController에서 username, usermail, password 받아서
   * - MySQL에 저장
   * - 성공/실패 boolean으로 반환
   * @param nickName 신규 사용자 nickname
   * @param email 신규 사용자 email
   * @param password 신규 사용자 password
   * @returns
   */
  public async createUser(props: CreateUserProps): Promise<boolean> {
    try {
      /**
       * @todo
       * DB insert 로직 구현, TypeORM
       */
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  /**
   * checkValidUser
   * @description
   * - 로그인 시 사용자 인증; middleware로 사용
   *
   * @param CheckUserProps
   * @returns 유효한 사용자인 경우 jwt, 아닌 경우 false 반환
   */
  public static async checkValidUser(props: CheckUserProps): Promise<boolean | string> {
    try {
      /**
       * @todo
       * check 로직 구현, TypeORM
       */
      return 'token';
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  /**
   * deleteUser
   * @description
   * - Soft Delete 방식 회원 삭제 로직
   * -
   * @returns 정상으로 삭제된 경우 true, 아니면 false
   */
  public async deleteUser(): Promise<boolean> {
    try {
      /**
       * @todo
       * 회원 탈퇴 로직 구현, TypeORM
       * - Soft Delete
       */
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
