/**
 * User Model
 * @description
 * - for MongoDB User table
 */
import { BeforeInsert, BeforeUpdate, Column, Entity, Index, ObjectID, ObjectIdColumn } from 'typeorm';
import { SALT_ROUND } from '../../config/db';
import { CreateUserProps, SocialProviers } from '../types';
import { genSalt, hash, compare } from 'bcrypt';

import Base from './Base.entity';
import Reply from './Reply.entity';

interface UserEntity {
  hashingPW: () => void;
  comparePW: (password: string) => Promise<boolean | void>;
}

@Entity({ database: 'mongodb', name: 'Users' })
export class User extends Base implements UserEntity {
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

  // @Column(() => Reply)
  // repls: Reply[];

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

  /**
   * 로그인시 PW 비교
   */
  async comparePW(pwd: string): Promise<boolean | void> {
    try {
      return await compare(pwd, this.password);
    } catch (e) {
      return console.error(e);
    }
  }
}
