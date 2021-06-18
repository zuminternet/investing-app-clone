import { Service } from 'zum-portal-core/backend/decorator/Alias';
import Reply, { ReplyDoc } from '../model/ReplyModel';

/**
 * ReplyService
 * @author wiii
 * @see packages/wiii/backend/service/Reply.service.ts
 */
@Service()
export default class ReplyService {
  /**
   * createReply
   * @description
   * 댓글 생성
   * ReplyDoc interface 참고
   */
  public async createReply(props: ReplyDoc): Promise<ReplyDoc> {
    return await Reply.create({ ...props });
  }

  /**
   * getAllReplsByDocId
   * @description
   * 종목 ticker 또는 news id로 해당 댓글 목록 불러오기
   * docId에 해당하는 부분은 각 담당자가 만든 모델, 스키마에 맞게 controller에서 입력
   * @example 종목 관련 댓글 검색 => `AAPL`, `005930.KRX` 등
   */
  public async getAllReplsByDocId(docId: string, offset = 0, limit = 15, email?: string): Promise<ReplyDoc[]> {
    return await Reply.find({ docId })
      .sort({ updatedAt: 'desc' })
      .skip(offset)
      .limit(limit)
      .lean<ReplyDoc[]>();
  }

  /** @todo 댓글 수정 */

  /** @todo 댓글 삭제 */

  /** @todo 좋아요 +1 */
  public async toggleLike(props) {
    const { replId } = props;
    return Reply.findByIdAndUpdate(replId, { $inc: { likes: 1 } }).exec();
  }
}
