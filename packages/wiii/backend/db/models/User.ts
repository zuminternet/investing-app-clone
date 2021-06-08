/**
 * User Model
 * @description
 * - for MySQL User table
 */
import { BeforeInsert, BeforeUpdate, Column, Entity, Index, ObjectID, ObjectIdColumn } from 'typeorm';
import { DBName, SALT_ROUND } from '../../config/db';
import { CreateUserProps, SocialProviers } from '../../db/types';
import { genSalt, hash, compare } from 'bcrypt';

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

  @Column(() => Reply)
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
   * 저장 및 변경시 hash된 상태로 저장
   */
  @BeforeInsert()
  @BeforeUpdate()
  async hashingPW(): Promise<void> {
    if (!this.password) return;
    try {
      const salt = await genSalt(SALT_ROUND);
      this.password = await hash(this.password, salt);
    } catch (e) {
      console.error(e);
    }
  }

  async comparePW(pwd: string): Promise<boolean> {
    return await compare(pwd, this.password);
  }
}
