/**
 * User Model
 * @description
 * - for MySQL User table
 */
import { DBName } from '$/config/db';
import { CreateUserProps } from '$/db/types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import Base from './Base';

@Entity({ database: DBName.mysql })
export default class User extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * @property
   * 사용자 nickname
   * - unique 필요 없을 듯
   */
  @Column({ type: 'varchar2', length: 100, nullable: false })
  nickname: string;

  /**
   * @property
   * 사용자 email
   * - unique
   */
  @Column({ type: 'varchar2', length: 100, unique: true, nullable: false })
  email: string;

  /**
   * @property
   * 사용자 password
   */
  @Column({ type: 'varchar2', length: 50, nullable: false })
  pass: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  constructor(props: CreateUserProps) {
    super();
    this.nickname = props.nickname;
    this.email = props.email;
    this.pass = props.password;
  }
}
