import { Controller, GetMapping } from 'zum-portal-core/backend/decorator/Controller';
import { Middleware } from 'zum-portal-core/backend/decorator/Middleware';
import { Request, Response } from 'express';
import { Inject } from 'zum-portal-core/backend/decorator/Alias';
import ArticleService from 'common/backend/service/ArticleService';
import BookmarkService from 'common/backend/service/BookmarkService';
import SearchkService from 'common/backend/service/SearchService';
import { getMatchedTickers } from 'common/domain';
import { getUser } from '../middlewares';

export interface SearchItem {
  category: string;
  country: string | null;
  has_eod: boolean;
  has_intraday: boolean;
  isBookmarked?: boolean;
  name: string;
  symbol: string;
}

@Controller({ path: '/api/search' })
export class SearchController {
  constructor(
    @Inject(ArticleService) private articleService: ArticleService,
    @Inject(BookmarkService) private bookmarkService: BookmarkService,
    @Inject(SearchkService) private searchService: SearchkService,
  ) {}

  private async appendIsBookmarked(target: Record<string, unknown>, email: string) {
    const isBookmarked = await this.bookmarkService.getIsBookmarked({ email: email as string, symbols: target.symbol as string });
    return { ...target, isBookmarked };
  }

  /**
   * SearchItems
   *
   * search page에 렌더링할 searched items들을 가져오는 메소드
   */
  @Middleware(getUser)
  @GetMapping({ path: '/items' })
  public async searchItems(request: Request, response: Response) {
    try {
      const { user } = request.body;
      const { keyword } = request.query;

      let items = await this.searchService.getSearchedItems({ keyword: keyword as string });

      if (!items) return response.sendStatus(404);

      const bookmarkAdder = (item) => this.appendIsBookmarked(item, user.email as string);

      if (user?.email) items = await Promise.all(items.map(bookmarkAdder));

      response.json(items);
    } catch (error) {
      console.log(error);
      response.status(404).json(error);
    }
  }

  /**
   * searchNews
   *
   * DB에서 articles 중 검색된 news만 가져오는 controller
   */
  @GetMapping({ path: '/news' })
  public async searchNews(request: Request, response: Response) {
    try {
      const { offset, limit, keyword } = request.query;
      const tickers = getMatchedTickers(keyword as string);
      const news = await this.articleService.getNews(+offset, +limit, tickers);

      response.json(news);
    } catch (error) {
      console.log(error);
      response.sendStatus(404);
    }
  }

  /**
   * searchOpinions
   *
   * DB에서 articles 중 검색된 opinions만 가져오는 controller
   */
  @GetMapping({ path: '/opinions' })
  public async searchOpinions(request: Request, response: Response) {
    try {
      const { offset, limit, keyword } = request.query;
      const tickers = getMatchedTickers(keyword as string);
      const opinions = await this.articleService.getOpinions(+offset, +limit, tickers);

      response.json(opinions);
    } catch (error) {
      console.log(error);
      response.sendStatus(404);
    }
  }
}
