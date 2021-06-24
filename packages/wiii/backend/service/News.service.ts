import { getDateString, times, WEEK_ONE } from '../../domain/date';
import { Service } from 'zum-portal-core/backend/decorator/Alias';
import { getCompanyNews, getMarketNews } from './news';
import { marketEnum } from '../../domain/newsData';
import { Caching } from 'zum-portal-core/backend/decorator/Caching';
import tickerMap from './tickerMap';

@Service()
export class NewsService {
  /** @todo 개발 모드에서 300분 단위 캐싱 */
  // private delay = MINUTE_ONE * 300;
  // private lastRequest: number;
  // private cachedNews = {};

  constructor() {
    // this.lastRequest = new Date().getTime() - MINUTE_ONE * 10;
  }

  /**
   * getMarketNewsList
   */
  @Caching({
    ttl: times.caching,
    runOnStart: false,
    refreshCron: '*/30 * * * *',
  })
  public getMarketNewsList(category: marketEnum) {
    return getMarketNews(category);
  }

  /**
   * getCompanyNewsList
   */
  @Caching({
    ttl: times.caching,
    runOnStart: false,
  })
  public getCompanyNewsList(symbol: string, from?: string, to?: string) {
    const now = new Date().getTime();
    if (symbol in tickerMap) symbol = tickerMap[symbol];
    return getCompanyNews(symbol, from ?? getDateString(now - WEEK_ONE * 2), to ?? getDateString(now));
  }
}
