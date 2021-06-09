import { ApiError } from '../utils/error/api';
import { getCustomRepository } from 'typeorm';
import { Service } from 'zum-portal-core/backend/decorator/Alias';
import { ReplyRepository } from '../db';

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
   * @todo 댓글 생성
   */
  public async createReply(props) {
    const createError = () => this.error(`Create Reply`, this.createReply.name);
    try {
      const { docId, email, content } = props;
      const result = await getCustomRepository(ReplyRepository).createReply({ docId, email, content });
      if (!result) throw createError();
      return true;
    } catch (e) {
      return console.error(e);
    }
  }

  /**
   * getAllReplsByDocId
   * @todo 댓글 목록 조회 by docId
   */
  public async getAllReplsByDocId(docId: string) {
    const getAllError = () => this.error(`Get All Repls By docId`, this.getAllReplsByDocId.name);
    try {
      const results = await getCustomRepository(ReplyRepository).getAllRepliesByDocID(docId);
      if (!results) throw getAllError();

      return results;
    } catch (e) {
      return console.error(e);
    }
  }

  /**
   * @todo 댓글 수정
   */

  /**
   * @todo 댓글 삭제
   */
}
