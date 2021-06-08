/**
 * Reply Model
 * @description
 * - for MongoDB Reply table
 */
import { ReplyProps } from '../types';
import { Column, Entity, ManyToOne, ObjectID, ObjectIdColumn } from 'typeorm';
import Base from './Base.entity';

@Entity({ database: 'mongodb', name: 'Repls' })
export default class Reply extends Base {
  @ObjectIdColumn()
  id: ObjectID;

  /**
   * @property
   * ticker, news 등 댓글 달릴 문서 id
   */
  @Column({ nullable: false })
  docId: string;

  /**
   * @property
   * 댓글 쓴 사용자 아이디
   * - User table id
   * - DAO에서 userID 조회후 입력; JOIN X
   */
  @Column({ nullable: false })
  userId: number;

  /**
   * @property
   * 현 댓글이 원(부모) 댓글인지, 대댓글인지
   */
  @Column({ type: 'bool', default: true })
  isParent: boolean;

  /**
   * @property
   * 현 댓글이 대댓글인 경우 원(부모) 댓글
   */
  @Column({ nullable: true })
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
  @Column({ type: 'text', nullable: false })
  content: string;

  /**
   * @property
   * 현 댓글이 원 댓글인 경우, 대댓글 개수
   */
  @Column({ default: 0 })
  childNums: number;

  /**
   * @property
   * 좋아요 수
   */
  @Column({ default: 0 })
  like: number;

  constructor(props: ReplyProps) {
    super();
    const { docId, userId, content } = props;
    this.docId = docId;
    this.userId = userId;
    this.content = content;
  }
}
