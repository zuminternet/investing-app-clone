import { Controller, GetMapping, PostMapping } from 'zum-portal-core/backend/decorator/Controller';
import { Inject } from 'zum-portal-core/backend/decorator/Alias';
import { Request, Response } from 'express';
import { ReplyService } from '../service/Reply.service';
import { ApiError } from '../utils/error/api';
import { TOKEN_COOKIE_KEY } from '../config/auth';
import { verifyToken } from '../utils/auth/jwt';

/**
 * @description
 * 댓글 CRUD api controller
 * @todo
 * - path enum
 */
@Controller({ path: '/api/reply' })
export class ReplyController {
  private error = (msg: string, funcName: string) => new ApiError(`Fail to ${msg}`, `---Ctrl:Reply:${funcName}: `);
  constructor(@Inject(ReplyService) private replyService: ReplyService) {}

  /**
   * 댓글 등록 Post
   * @todo
   * - middleware; validate
   */
  @PostMapping({ path: '/' })
  public async postNewReply({ cookies, body }: Request, res: Response) {
    const postReplyError = () => this.error(`Post new Reply`, this.postNewReply.name);
    try {
      // jwt 인증 확인
      const token = cookies[TOKEN_COOKIE_KEY];
      if (!verifyToken(token)) throw postReplyError();

      const { docId, email, content } = body;
      const result = await this.replyService.createReply({ docId, email, content });
      if (!result) throw postReplyError();

      res.set({ 'Access-Control-Allow-Origin': '*' });
      res.json({ message: 'Success to add new Reply' });
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: `Fail to add new Reply: ${e}` });
    }
  }

  /**
   * 해당 페이지 댓글 불러오기
   * @todo
   */
  @GetMapping({ path: '/:docId' })
  public async getReplsByDoc({ params }: Request, res: Response) {
    const getReplsError = () => this.error(`Get Replies`, this.getReplsByDoc.name);
    try {
      const { docId } = params;
      console.log({ docId });
      if (!docId) throw getReplsError();

      const results = this.replyService.getAllReplsByDocId(docId);
      console.table(results);
      if (!results) throw getReplsError();

      res.status(200).json({ message: 'Success to Get All Replies', results });
    } catch (e) {
      console.error(e);
      res.status(400).send({ message: `Fail to Get All Replies: ${e.message}` });
    }
  }
}
