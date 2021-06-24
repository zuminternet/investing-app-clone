import { Service } from 'zum-portal-core/backend/decorator/Alias';
import { Caching } from 'zum-portal-core/backend/decorator/Caching';

import { GetHistoricalOptions } from '../../domain/apiOptions';
import { marketName } from '../../domain/apiUrls';
import { MINUTE_ONE, times } from '../../domain/date';
import { devPrint, IS_PRO_MODE } from '../../domain/utilFunc';
import { fetchHistoricalData as KRX } from './chart/KRX';
import stocksList from './chart/KRXList';
import { getStockOverview } from './overview/stock';

const fetchers = {
  [marketName.stocks]: KRX,
  [marketName.indexes]: undefined,
  [marketName.coins]: undefined,
} as const;

const resultValidator = (data, status: number, statusText: string) => {
  if (status >= 400 || !data || !Object.keys(data).length) throw new Error(statusText);
  return;
};

/**
 * @description
 * - Market data 전송
 * - 1분 단위 cahing
 */
@Service()
export class MarketService {
  /** @todo 개발 모드에서 300분 단위 캐싱 */
  private delay = MINUTE_ONE * 300;
  private lastRequest: number;
  private cachedHistory = {};
  private cachedOverview = {};

  constructor() /**
   * @Yml('marketApi') private MarketApi: any,
   * @Inject(ZumProvisionAdapter) private adapter: ZumProvisionAdapter,
   */
  {
    this.lastRequest = new Date().getTime() - MINUTE_ONE * 10;
  }

  /**
   * getStockHistorical
   * 개별 주식, 지수, 코인 historical 데이터 axios.get & caching
   * @description
   * 실무에서는 webSocket 등 실시간 데이터 업데이트 해야 하지만
   * 파일럿 프로젝트에서는 무료 api를 사용하므로 사용량 제한 위해 캐싱 사용,
   */
  @Caching({
    /** 개발모드에서는 1시간에 한 번만 실행 */
    refreshCron: IS_PRO_MODE ? `30 * * * * *` : `1 * * *`,
    /** 캐싱 기간 초 단위 */
    ttl: IS_PRO_MODE ? times.caching : times.caching * 60,
    runOnStart: false,
    unless: (result) => !result,
  })
  public async getHistorical(options: GetHistoricalOptions) {
    try {
      const { type, ticker } = options;
      console.log({ options });

      /** response: data, status, statusText, headers, config */
      const { data, status, statusText } = await fetchers[type](options);
      devPrint()({ type, ticker, status, statusText }, `getHistorical fetchers`);

      resultValidator(data, status, statusText);

      return data;
    } catch (e) {
      return console.error(e);
    }
  }

  /**
   * getCachedHistorical
   * @description
   * node-cache의 경우 key 값을 동적으로 정의할 수 없어서
   * 클래스 property에 저장
   * @param options
   * @returns
   */
  public async getCachedHistorical(options: GetHistoricalOptions) {
    try {
      const { type, ticker } = options;

      const requestTime = new Date().getTime();
      const cached = this.cachedHistory[ticker];
      if (requestTime - this.lastRequest < this.delay && cached) return cached;

      /** response: data, status, statusText, headers, config */
      const { data, status, statusText } = await fetchers[type](options);
      devPrint()({ type, ticker, status, statusText, size: data?.results?.length }, `getHistorical No Cache fetchers`);

      resultValidator(data, status, statusText);

      this.lastRequest = requestTime;
      this.cachedHistory[ticker] = data;
      return data;
    } catch (e) {
      return console.error(e);
    }
  }

  private sortStocks() {
    return Object.values(this.cachedHistory).sort(({ change: a }, { change: b }) => b - a);
  }

  @Caching({
    refreshCron: IS_PRO_MODE ? `30 * * * * *` : `1 * * *`,
    ttl: IS_PRO_MODE ? times.caching : times.caching * 300,
    runOnStart: false,
    unless: (result) => !result,
  })
  public async getAllStocks() {
    const baselist = IS_PRO_MODE ? stocksList : stocksList.slice(0, 2);

    for await (const { ticker, tickerName } of baselist) {
      const { data, status, statusText } = await KRX({ ticker, type: `stock` });
      if (status >= 400) throw Error(statusText);
      this.cachedHistory[ticker] = { ticker, tickerName, ...data };

      const overview = await getStockOverview(ticker);
      this.cachedOverview[ticker] = overview;
    }

    console.log(`[Market:Service:Cached] ${Object.keys(this.cachedHistory)}`);

    return { hist: this.sortStocks(), overview: this.cachedOverview };
  }
}
