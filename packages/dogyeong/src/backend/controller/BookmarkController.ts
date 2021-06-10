import { Controller, PostMapping, DeleteMapping } from 'zum-portal-core/backend/decorator/Controller';
import { Request, Response } from 'express';
import { Inject } from 'zum-portal-core/backend/decorator/Alias';
import BookmarkService from 'common/backend/service/BookmarkService';
import TokenService from '../service/TokenService';
import { getUser } from '../middlewares';
import { Middleware } from 'zum-portal-core/backend/decorator/Middleware';

@Controller({ path: '/api/bookmark' })
export class BookmarkController {
  constructor(
    @Inject(BookmarkService) private bookmarkService: BookmarkService,
    @Inject(TokenService) private tokenService: TokenService,
  ) {}

  @Middleware(getUser)
  @PostMapping({ path: ['/'] })
  public async addBookmark(req: Request, res: Response) {
    try {
      const { symbol, name, category, user } = req.body;

      if (!symbol || !name || !category) throw new Error('invalid body');

      if (!user?.email) throw new Error('invalid user');

      const bookmark = await this.bookmarkService.createBookmark({ email: user.email, symbol, name, category });

      if (!bookmark) throw new Error('error while creating bookmark');

      res.json(bookmark);
    } catch (err) {
      res.status(500).json({ err: err.message ?? err });
    }
  }

  @Middleware(getUser)
  @DeleteMapping({ path: ['/'] })
  public async removeBookmark(req: Request, res: Response) {
    try {
      const { user, symbol, name } = req.body;

      if (!symbol) throw new Error('invalid symbol');
      if (!user?.email) throw new Error('invalid user');

      await this.bookmarkService.deleteBookmark({ email: user.email, symbol, name });

      res.json(symbol);
    } catch (err) {
      res.status(500).json({ err: err.message ?? err });
    }
  }
}
