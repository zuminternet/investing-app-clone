import { Controller, GetMapping, PostMapping } from 'zum-portal-core/backend/decorator/Controller';
import { Middleware } from 'zum-portal-core/backend/decorator/Middleware';
import { Request, Response } from 'express';
import { Inject } from 'zum-portal-core/backend/decorator/Alias';
import { getUser } from '../middlewares';
import ReplyService from 'common/backend/service/ReplyService';

@Controller({ path: '/api/reply' })
export class ReplyController {
  constructor(@Inject(ReplyService) private replyService: ReplyService) {}

  /**
   * getReply
   *
   * search page에 렌더링할 searched items들을 가져오는 메소드
   */
  @GetMapping({ path: ['/:docId'] })
  public async getReplies(req: Request, res: Response) {
    const { docId } = req.params;
    const replies = (await this.replyService.getAllReplsByDocId(docId)) ?? [];
    res.json({ results: replies });
  }

  @Middleware(getUser)
  @PostMapping({ path: ['/'] })
  public async createReply(req: Request, res: Response) {
    // await this.replyService.createReply()
    // return
  }
}
