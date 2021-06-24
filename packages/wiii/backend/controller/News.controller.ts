import { Request, Response } from 'express';
import { Controller, GetMapping } from 'zum-portal-core/backend/decorator/Controller';
import { Inject } from 'zum-portal-core/backend/decorator/Alias';

import { NewsService } from '../service/News.service';
import { marketEnum } from 'domain/newsData';

/**
 * @description
 * 뉴스 리스트 API
 * /api/news/
 */
@Controller({ path: '/api/news' })
export class MarketController {
  constructor(@Inject(NewsService) private newsService: NewsService) {}

  /**
   * 시장 전체 뉴스 리스트 응답
   * @example
   * /api/news/market/general
   * /api/news/market/crypto
   */
  @GetMapping({ path: ['/market/:category'] })
  public async sendMarketNewsList({ params }: Request, res: Response) {
    try {
      /** @todo 예외처리 */
      const data = await this.newsService.getMarketNewsList(params.category as marketEnum);
      res.send(data);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  }

  /**
   * 특정 기업 뉴스 리스트 응답
   * @example
   * /api/news/company/AAPL
   * /api/news/company/005930
   */
  @GetMapping({ path: ['/company/:symbol'] })
  public async sendCompanyNewsList({ params, query }: Request, res: Response) {
    try {
      const { symbol } = params;
      const { dateFrom, dateTo } = query;

      /** @todo 뉴스기사 없는 종목 예외처리 */
      const data = await this.newsService.getCompanyNewsList(symbol, dateFrom as string, dateTo as string);
      res.send(data);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  }
}
