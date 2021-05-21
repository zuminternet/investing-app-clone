/**
 * Reply Model
 * @description
 * - for MongoDB Reply table
 */
import { DBName } from '$/config/db';
import { Column, Entity, ManyToOne, ObjectID, ObjectIdColumn } from 'typeorm';
import Base from './Base';
import User from './User';

@Entity({ database: DBName.mongoDB })
export default class Reply extends Base {
  @ObjectIdColumn()
  id: ObjectID;

  /**
   * @property
   * 문서(뉴스, 댓글, 종목 상세 등) id
   * - JOIN??
   */
  @Column()
  docId: string;

  /**
   * @property
   * 댓글 쓴 사용자 아이디
   * - User table id와 Join
   */
  @Column()
  @ManyToOne(
    () => User,
    (user) => user.id,
  )
  userId: User;

  /**
   * @property
   * 현 댓글이 원(부모) 댓글인지, 대댓글인지
   */
  @Column({ type: 'bool' })
  isParent: boolean;

  /**
   * @property
   * 현 댓글이 대댓글인 경우 원(부모) 댓글
   */
  @Column()
  @ManyToOne(
    () => Reply,
    (reply) => reply.id,
  )
  parentReply: Reply;

  /**
   * @property
   * 댓글 내용
   * - 글자수 제한?
   */
  @Column({ type: 'text' })
  content: string;

  /**
   * @property
   * 현 댓글이 원 댓글인 경우, 대댓글 개수
   */
  @Column({ type: 'int' })
  childNums: number;

  /**
   * @property
   * 좋아요 수
   */
  @Column({ type: 'int' })
  like: number;

  /**
   * @property
   * 싫어요 수
   */
  @Column({ type: 'int' })
  dislike: number;
}
