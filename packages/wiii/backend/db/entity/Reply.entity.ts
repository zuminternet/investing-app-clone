/**
 * Reply Model
 * @description
 * - for MongoDB Reply table
 */
import { Column, Entity, Index, ManyToOne, ObjectID, ObjectIdColumn } from 'typeorm';
import Base from './Base.entity';
import { User } from './User.entity';

@Entity({ database: 'mongodb', name: 'Repls' })
export class Reply extends Base {
  @Index()
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
   */
  @ManyToOne(
    (type) => User,
    (User) => User.repls,
    { cascade: ['insert', 'update'] },
  )
  userId: User;

  /**
   * @fix
   * - TypeORM - MongoDB에서 Relation JOIN 안되는 문제 있어서 create 할 때 직접 입력
   */
  @Column({ nullable: false })
  userThumbnail: string;

  @Column({ nullable: false })
  userMail: string;

  @Column({ nullable: false })
  userName: string;

  /**
   * @property
   * 현 댓글이 원(부모) 댓글인지, 대댓글인지
   */
  @Column({ type: 'bool', default: true })
  isParent: boolean;

  /**
   * @property
   * 현 댓글이 대댓글인 경우 원(부모) 댓글 object id
   */
  @Column({ type: 'string', nullable: true })
  parentReply: ObjectID;

  /**
   * @property
   * 댓글 내용
   * - 글자수 제한?
   */
  @Column({ type: 'text', nullable: false })
  contents: string;

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
  likes: number;

  constructor(
    docId: string,
    userMail: string,
    userName: string,
    contents: string,
    isParent = true,
    parentReply?: ObjectID,
    userThumbnail?: string,
    likes = 0,
  ) {
    super();
    this.docId = docId;
    this.userThumbnail = userThumbnail;
    this.userName = userName;
    this.userMail = userMail;
    this.contents = contents;
    this.parentReply = parentReply;
    this.isParent = isParent;
    this.childNums = 0;
    this.likes = likes;
  }
}
