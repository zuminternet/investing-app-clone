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
   * getReplies
   *
   */
  @GetMapping({ path: ['/:docId'] })
  public async getReplies(req: Request, res: Response) {
    try {
      const { docId } = req.params;
      const replies = (await this.replyService.getAllReplsByDocId(docId)) ?? [];
      res.json({ results: replies });
    } catch (err) {
      res.status(500).json({ err: err.message ?? err });
    }
  }

  @Middleware(getUser)
  @PostMapping({ path: ['/'] })
  public async createReply(req: Request, res: Response) {
    try {
      const { user, docId, contents } = req.body;

      if (!user) return res.sendStatus(403);
      if (!docId || !contents) return res.sendStatus(400);

      const reply = await this.replyService.createReply({
        docId,
        contents,
        email: user.email,
        picture: user.picture,
        name: user.name,
      });

      res.json(reply);
    } catch (err) {
      res.status(500).json({ err: err.message ?? err });
    }
  }
}
