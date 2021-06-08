import Reply from '../entity/Reply.entity';
import { User } from '../entity/User.entity';
import { CreateReplyProps } from '../../db/types';
import {
  getRepository,
  MongoRepository,
  ObjectID,
  UpdateResult,
  getConnection,
  Connection,
  EntityRepository,
  EntityManager,
} from 'typeorm';

/**
 * UserRepository DAO - TypeORM
 * @description
 * - 사용자 생성 인증 수정 삭제
 * - 사용자 댓글 id 배열 추가
 */
@EntityRepository()
export class UserRepository {
  constructor(private manager: EntityManager) {}

  public async checkDuplicatedEmail(email: string): Promise<true | void> {
    try {
      const userId = await this.manager
        .createQueryBuilder()
        .select(email)
        .where({ email })
        .getRawOne();

      if (userId) throw Error();
      return true;
    } catch (e) {
      console.error(`[DB:Repo:User] checkDuplicated`);
      return console.error(e);
    }
  }

  public async createUser(props) {
    try {
      const { nickname, email, password } = props;
      const newbie = await this.manager.create(User, { nickname, email, password });
      await this.manager.save(newbie);
      return true;
    } catch (e) {
      console.error(`[DB:Repo:User] createUser`);
      return console.error(e);
    }
  }

  /**
   * createReply
   * @description
   * - 댓글 생성 및 수정
   * - MongoDB에선 동일 document id에 save하면 update되므로 별도의 수정 로직 불필요
   */
  public async createReply(props: CreateReplyProps): Promise<boolean | void> {
    try {
      const { id, email, docId, content } = props;
      /**
       * @description
       * - User의 findIdByMail method 사용시 현 Entity에서 MySQL DAO instance 생성해야 함
       *   - static Method로 생성시 this에서 manager/repository 객체 사라짐
       * - 굳이 instance 생성할 필요없고, 해당 id 찾는 로직만 필요하므로 queryBuilder 사용
       * @todo
       * - 함수 분리
       */
      const userId = await getRepository(User)
        .createQueryBuilder('user')
        .select('id')
        .where({ email })
        .getRawOne();

      const reply = await this.manager.create(Reply, { id, docId, userId, content });
      await this.manager.save(reply);
      return true;
    } catch (e) {
      console.error(`[DB:Repo:User] createReply`);
      return console.error(e);
    }
  }

  /**
   * getAllRepliesByDocID
   * @description
   * - 문서번호에 해당하는 모든 댓글
   */
  // public async getAllRepliesByDocID(docId: string): Promise<[Reply[], number] | void> {
  //   try {
  //     return await this.findAndCount({ where: { docId: { $eq: docId } } });
  //   } catch (e) {
  //     console.error(`[DB:Repo:User] getAllRepliesByDocID`)
  //     return console.error(e);
  //   }
  // }

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
