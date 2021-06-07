/**
 * User Model
 * @description
 * - for MySQL User table
 */
import { DBName } from '../../config/db';
import { CreateUserProps, SocialProviers } from '../../db/types';
import { Column, Entity, Index, ObjectID, ObjectIdColumn } from 'typeorm';
import Base from './Base';
import Reply from './Reply';

@Entity({ database: DBName.mongoDB, name: 'Users' })
export default class User extends Base {
  @ObjectIdColumn()
  id!: ObjectID;

  /**
   * @property
   * 사용자 nickname
   * - unique 필요 없을 듯
   */
  @Column({ length: 100, nullable: false })
  nickname: string;

  /**
   * @property
   * 사용자 email
   * - unique, index
   */
  @Index()
  @Column({ length: 100, unique: true, nullable: false })
  email!: string;

  /**
   * @property
   * 사용자 password
   */
  @Column({ length: 50, nullable: false })
  password: string;

  @Column((type) => Reply)
  repls: Reply[];

  /**
   * @property
   * 활동 여부 체크 optional
   */
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  /**
   * @property
   * 소셜 로그인 사용하는 경우
   * @example 'google' | 'facebook'
   */
  @Column({ type: 'enum', enum: ['gg', 'gh', 'fb'], nullable: true })
  provider: SocialProviers;

  constructor({ nickname, email, password }: CreateUserProps) {
    super();
    this.email = email;
    this.nickname = nickname;
    this.password = password;
  }

  /**
   * session 확인 위한 JWT 발급
   */
  async getJWT() {}
}
