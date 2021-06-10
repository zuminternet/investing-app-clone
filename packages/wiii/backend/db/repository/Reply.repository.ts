import { Reply } from '../entity/Reply.entity';
import { MongoRepository, EntityRepository, getCustomRepository } from 'typeorm';
import { RepoError } from '../../utils/error/api';
import { UserRepository } from './User.repository';

/**
 * UserRepository DAO - TypeORM
 * @description
 * - 사용자 생성 인증 수정 삭제
 * - 사용자 댓글 id 배열 추가
 */
@EntityRepository(Reply)
export class ReplyRepository extends MongoRepository<Reply> {
  private error = (msg: string, name: string) => new RepoError(`Fail to ${msg}`, `-----Repo:Reply:${name}: `);
  constructor() {
    super();
  }

  /**
   * createReply
   * @description
   * - 댓글 생성 및 수정
   * - MongoDB에선 동일 document id에 save하면 update되므로 별도의 수정 로직 불필요
   */
  public async createReply(props): Promise<boolean | void> {
    const createError = () => this.error(`Create Reply`, this.createReply.name);
    try {
      const { docId, email, contents } = props;

      /** @todo 예외처리 */
      if (!contents.trim().length) throw createError();

      const users = await getCustomRepository(UserRepository).find({ email });
      if (users.length !== 1) throw createError();
      const [user] = users;

      const reply = this.create({ docId, userMail: user.email, userName: user.nickname, contents });
      if (props.parentReplyId) {
        reply.parentReply = (await getCustomRepository(ReplyRepository).findOne({ docId: props.parentReplyId })).id;
      }

      const result = await this.save(reply);
      if (!result) throw createError();

      return true;
    } catch (e) {
      return console.error(e);
    }
  }

  /**
   * getAllRepliesByDocID
   * @description
   * - 문서번호에 해당하는 모든 댓글
   */
  public async getAllRepliesByDocID(docId: string): Promise<Reply[] | void> {
    const getAllError = () => this.error(`Get All Repls by docId`, this.getAllRepliesByDocID.name);
    try {
      const results = await this.find({ where: { docId } });
      if (!results) throw getAllError();

      return results;
    } catch (e) {
      return console.error(e);
    }
  }

  /**
   * getOneReply
   * @description
   * - 특정 댓글 선택한 경우
   */
  // public async getOneReply(id: ObjectID | string): Promise<Reply> {
  //   try {
  //     return await this.findOneOrFail(id);
  //   } catch (e) {
  //     console.error(e);
  //     return;
  //   }
  // }

  /**
   * deleteReply
   * @description
   * - 댓글 삭제; softDelete
   */
  // public async deleteReply(id: ObjectID | string): Promise<UpdateResult> {
  //   try {
  //     return await this.softDelete(id);
  //   } catch (e) {
  //     console.error(e);
  //     return;
  //   }
  // }
}
