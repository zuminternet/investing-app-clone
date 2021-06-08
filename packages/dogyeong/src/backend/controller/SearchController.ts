import { Controller, GetMapping } from 'zum-portal-core/backend/decorator/Controller';
import { Request, Response } from 'express';
import { Inject } from 'zum-portal-core/backend/decorator/Alias';
import ArticleService from 'common/backend/service/ArticleService';
import BookmarkService from 'common/backend/service/BookmarkService';
import SearchkService from 'common/backend/service/SearchService';
import { getTickerArray } from 'common/domain';

@Controller({ path: '/api/search' })
export class SearchController {
  constructor(
    @Inject(ArticleService) private articleService: ArticleService,
    @Inject(BookmarkService) private bookmarkService: BookmarkService,
    @Inject(SearchkService) private searchService: SearchkService,
  ) {}

  /**
   * @description search page에 렌더링할 searched items들을 가져오는 메소드
   */
  @GetMapping({ path: '/items' })
  public async getSearchedItems(request: Request, response: Response) {
    try {
      const { keyword, email } = request.query;
      let items = await this.searchService.getSearchedItems({ keyword: keyword as string });

      if (!items) return response.sendStatus(404);

      items = await Promise.all(
        items.map(async (item) => {
          const isBookmarked = await this.bookmarkService.getIsBookmarked({ email: email as string, symbols: item.symbol });
          return { ...item, isBookmarked };
        }),
      );

      response.json(items);
    } catch (error) {
      console.log(error);
      response.status(404).json(error);
    }
  }

  /**
   * @description DB에서 articles 중 검색된 news만 가져오는 controller
   * @param request
   * @param response
   * @returns
   */
  @GetMapping({ path: '/news' })
  public async getNewsForSearch(request: Request, response: Response) {
    try {
      const { offset, limit, tickers } = request.query;

      const news = await this.articleService.getNewsForSearch({
        offset: +offset,
        limit: +limit,
        tickers: getTickerArray(tickers as string[]),
      });

      if (news) {
        return response.status(200).send(news);
      }

      response.sendStatus(404);
    } catch (error) {
      console.log(error);
    }
  }

  @GetMapping({ path: '/analyses' })
  public async getAnalysesForSearch(request: Request, response: Response) {
    try {
      const { offset, limit, tickers } = request.query;
      const analyses = await this.articleService.getOpinionsForSearch({
        offset: +offset,
        limit: +limit,
        tickers: getTickerArray(tickers as string[]),
      });

      console.log(tickers, analyses);

      if (analyses) {
        return response.status(200).send(analyses);
      }

      response.sendStatus(404);
    } catch (error) {
      console.log(error);
    }
  }
}
