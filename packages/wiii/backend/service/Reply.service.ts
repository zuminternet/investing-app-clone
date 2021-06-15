import { ApiError } from '../utils/error/api';
import { getCustomRepository } from 'typeorm';
import { Service } from 'zum-portal-core/backend/decorator/Alias';
import { ReplyRepository, UserRepository } from '../db';
import { ObjectID } from 'mongodb';

/**
 * ReplyService
 * @description
 * - 댓글 CRUD
 */
@Service()
export class ReplyService {
  private error = (msg: string, name: string) => new ApiError(`Fail to ${msg}`, `---Service:Reply:${name}: `);
  constructor() {}

  /**
   * createReply
   * @todo 댓글 생성, 수정
   */
  public async createReply(props) {
    const createError = () => this.error(`Create Reply`, this.createReply.name);

    const result = await getCustomRepository(ReplyRepository).createReply({ ...props });
    if (!result) throw createError();

    return true;
  }

  /**
   * getAllReplsByDocId
   * @todo 댓글 목록 조회 by docId
   */
  public async getAllReplsByDocId(docId: string) {
    const getAllError = () => this.error(`Get All Repls By docId`, this.getAllReplsByDocId.name);

    const results = await getCustomRepository(ReplyRepository).getAllRepliesByDocID(docId);
    if (!results) throw getAllError();

    return results;
  }

  /**
   * toggleLike
   * 사용자 정보 조회 => 좋아요 없는 경우 좋아요 +1, 기존 좋아요 있는 경우 좋아요 -1
   */
  public async toggleLike(props) {
    const likeError = () => this.error(`Toggle Like`, this.toggleLike.name);

    const { email, replId } = props;
    const objectReplid = new ObjectID(replId);

    const replyRepo = getCustomRepository(ReplyRepository);
    const { likes } = await replyRepo.findOne(replId);

    const userRepo = getCustomRepository(UserRepository);
    const { email: userMail, likes: userLikes } = await userRepo.findOne({ email });
    if (email !== userMail) throw likeError();

    /** 이미 좋아요 된 댓글에서 좋아요 취소 */
    /** @todo custom repo에서 관련 method도 정의해서 활용 */
    if (replId in userLikes) {
      const updated = Object.keys(userLikes).reduce((acc, cur) => {
        if (cur !== replId) acc[cur] = cur;
        return acc;
      }, {});

      replyRepo.updateOne({ _id: objectReplid }, { $set: { likes: likes - 1 } }, { upsert: true });
      userRepo.updateOne({ email }, { $set: { likes: updated } }, { upsert: true });
      return true;
    }

    /** 좋아요 추가 */
    const result = await replyRepo.updateOne({ _id: objectReplid }, { $set: { likes: likes + 1 } }, { upsert: true });
    console.log({ result });
    userRepo.updateOne({ email }, { $set: { likes: { ...userLikes, [replId]: replId } } }, { upsert: true });
    return true;
  }

  /**
   * @todo 댓글 삭제
   */
}
