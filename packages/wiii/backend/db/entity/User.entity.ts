import { BeforeInsert, BeforeUpdate, Column, Entity, Index, ObjectID, ObjectIdColumn, OneToMany } from 'typeorm';
import { SALT_ROUND } from '../../config/db';
import { CreateUserProps, SocialProviers } from '../types';
import { genSalt, hash, compare } from 'bcrypt';

import Base from './Base.entity';
import { Reply } from './Reply.entity';
import { ApiError } from '../../utils/error/api';
interface UserEntity {
  hashingPW: () => void;
  comparePW: (password: string) => Promise<boolean | void>;
}

/**
 * User Model
 * @description
 * - for MongoDB User table
 * @example 생성결과
 * 
  User {
    email: 'test@com.comm',
    password: '$2b$15$TDGoo9TWQOod/TUjy2ad.u.vNTeX/q1PMI3jo.q0Kez7M4s2qZ7hq',
    nickname: 'hello',
    createdAt: 2021-06-08T14:21:03.157Z,
    updatedAt: 2021-06-08T14:21:03.157Z,
    deletedAt: null,
    provider: null,
    repls: Reply {
      docId: undefined,
      userId: undefined,
      content: undefined,
      deletedAt: null,
      parentReply: null
    },
    id: ObjectID {
      _bsontype: 'ObjectID',
      id: Buffer(12) [Uint8Array] [
        96, 191, 124, 207, 237,
        185, 211,  22, 135,  35,
        69, 211
      ]
    }
  }
 *
 */
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
  nickname!: string;

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
  @Column({ length: 100, nullable: false })
  password!: string;

  @OneToMany(
    (type) => Reply,
    (Reply) => Reply.userId,
    { cascade: ['insert', 'update'] },
  )
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

  /**
   * @property
   * 좋아요 누른 댓글
   */
  @Column({ default: {} })
  likes: object;

  /**
   * @property
   * 북마크 종목/지수/코인
   */
  @Column({ default: {} })
  bookmarkTickers: object;

  /**
   * @property
   * 북마크 뉴스
   */
  @Column({ default: {} })
  bookmarkNews: {};

  constructor(email: string, password: string, nickname: string) {
    super();
    this.email = email;
    this.password = password;
    this.nickname = nickname;
    this.isActive = true;
    this.likes = {};
    this.bookmarkNews = {};
    this.bookmarkTickers = {};
  }

  /**
   * @todo
   * - 정규식 적용
   * - 여기서 에러 던지는건 되는데, 그래도 입력은 됨 => class-validator 와 같이 써야 함..
   * - @see https://velog.io/@devminchan/Typeorm과-class-validator로-엔티티-저장-시-검증-로직-구현하기
   */
  @BeforeInsert()
  validator() {
    const validatorError = (msg?: string) => new ApiError(`Fail to validate user info..${msg}`, `[DB:Entity:User]`);
    try {
      const { password, email, nickname } = this;
      if (!password || !email || !nickname) throw validatorError(`something null`);
      if (password.length > 50 || password.length < 3) throw validatorError(`password length`);
      if (email.length > 100 || email.length < 3) throw validatorError(`email length`);
      if (!/^(\S+)@(\S+).(\S+)(.\S?)$/.test(email)) throw validatorError(`email regexp`);
      if (nickname.length > 100 || nickname.length < 3) throw validatorError(`nickname length`);
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * PW 저장 및 변경시 hash된 상태로 저장
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
  public async comparePW(pwd: string): Promise<boolean | void> {
    try {
      return await compare(pwd, this.password);
    } catch (e) {
      return console.error(e);
    }
  }
}
