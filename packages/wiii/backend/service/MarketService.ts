import { Service } from 'zum-portal-core/backend/decorator/Alias';
import { Caching } from 'zum-portal-core/backend/decorator/Caching';

import { GetHistoricalOptions } from '../../domain/apiOptions';
import { marketName } from '../../domain/apiUrls';
import { times } from '../../domain/date';
import { fetchHistoricalData as historicalKoreanData } from '../chart/KRX';

const IS_PRO_MODE = process.env.NODE_ENV === `production`;

const fetchers = {
  [marketName.stocks]: historicalKoreanData,
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
  constructor() /**
   * @Yml('marketApi') private MarketApi: any,
   * @Inject(ZumProvisionAdapter) private adapter: ZumProvisionAdapter,
   */
  {}

  /**
   * getStockHistorical
   * 개별 주식, 지수, 코인 historical 데이터 axios.get & caching
   * @description
   * 실무에서는 webSocket 등 실시간 데이터 업데이트 해야 하지만
   * 파일럿 프로젝트에서는 무료 api를 사용하므로 사용량 제한 위해 캐싱 사용,
   * @todo node-caching 안되는 문제..? client 요청할 때마다 매번 API 요청 보내게 됨..
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

      /** response: data, status, statusText, headers, config */
      const { data, status, statusText } = await fetchers[type](options);
      console.log({ type, ticker, status, statusText });
      resultValidator(data, status, statusText);

      return data;
    } catch (e) {
      return console.error(e);
    }
  }
}
