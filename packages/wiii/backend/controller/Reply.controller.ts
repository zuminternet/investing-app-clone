import { Controller, GetMapping, PostMapping } from 'zum-portal-core/backend/decorator/Controller';
import { Inject } from 'zum-portal-core/backend/decorator/Alias';
import { Request, Response } from 'express';
import { ReplyService } from '../service/Reply.service';
import { ApiError } from '../utils/error/api';
import { TOKEN_COOKIE_KEY } from '../config/auth';
import { verifyToken } from '../utils/auth/jwt';

export interface VerifiedToken {
  data: string;
  iat: number;
  exp: number;
}

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
      /** @example { data: '123123@mail.com', iat: 1623767527, exp: 1623774727 } */
      const { data } = verifyToken(token) as VerifiedToken;
      if (!data) throw postReplyError();

      const result = await this.replyService.createReply({ ...body });
      if (!result) throw postReplyError();

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
  public async getReplsByDoc({ params: { docId }, query, cookies }: Request, res: Response) {
    const getReplsError = () => this.error(`Get Replies`, this.getReplsByDoc.name);
    try {
      if (!docId) throw getReplsError();

      let email;
      if (query.auth !== 'false') {
        const token = cookies[TOKEN_COOKIE_KEY];
        const verified = verifyToken(token) as VerifiedToken;
        email = verified.data;
      }

      const results = await this.replyService.getAllReplsByDocId(docId, email);
      if (!results) throw getReplsError();

      res.status(200).json({ message: 'Success to Get All Replies', results });
    } catch (e) {
      console.error(e);
      res.status(400).send({ message: `Fail to Get All Replies: ${e.message}` });
    }
  }

  /**
   * 좋아요 버튼 api
   * @description
   * 기존에 좋아요가 된 경우 해제, 신규 좋아요인 경우 등록
   * - body: replId
   */
  @PostMapping({ path: '/likes' })
  public async postLikes({ cookies, body: { replId } }: Request, res: Response) {
    const postLikesError = () => this.error(`Post Likes`, this.postLikes.name);
    try {
      const token = cookies[TOKEN_COOKIE_KEY];
      const { data } = verifyToken(token) as VerifiedToken;
      if (!data) throw postLikesError();

      const result = await this.replyService.toggleLike({ replId, email: data });
      if (!result) throw postLikesError();

      res.json({ message: 'Success to add a new Like' });
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: `Fail to add a new Like: ${e}` });
    }
  }
}
