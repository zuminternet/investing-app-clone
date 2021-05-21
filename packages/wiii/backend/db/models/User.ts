/**
 * User Model
 * @description
 * - for MySQL User table
 */
import { DBName } from '$/config/db';
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
  @Column({ type: 'varchar2', length: 100 })
  nickname: string;

  /**
   * @property
   * 사용자 email
   * - unique
   */
  @Column({ type: 'varchar2', length: 100, unique: true })
  email: string;

  /**
   * @property
   * 사용자 password
   */
  @Column({ type: 'varchar2', length: 50 })
  pass: string;

  @Column({ type: 'boolean' })
  isActive: boolean;
}
