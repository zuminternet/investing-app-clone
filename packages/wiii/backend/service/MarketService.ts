import { Service } from 'zum-portal-core/backend/decorator/Alias'
import { Caching } from 'zum-portal-core/backend/decorator/Caching'

import { GetHistoricalOptions } from '../../domain/apiOptions'
import { marketName } from '../../domain/apiUrls'
import { times } from '../../domain/date'
import { fetchHistoricalData as historicalKoreanData } from '../chart/KRX'

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
  {
    /** @todo  */
  }

  /**
   * getStockHistorical
   * 개별 주식, 지수, 코인 historical 데이터 axios.get & caching
   * @description
   * 실무에서는 webSocket 등 실시간 데이터 업데이트 해야 하지만
   * 파일럿 프로젝트에서는 무료 api를 사용하므로 사용량 제한 위해 캐싱 사용,
   */
  @Caching({
    refreshCron: `30 * * * * *`,
    /** 1분 단위 캐싱 */
    ttl: times.caching,
    runOnStart: false,
    unless: (result) => !result,
  })
  public static async getHistorical(options: GetHistoricalOptions) {
    try {
      const { type } = options;
      const { data, status, statusText } = await fetchers[type](options);
      console.log({ status, statusText });
      resultValidator(data, status, statusText);
      return data;
    } catch (e) {
      return console.error(e);
    }
  }
}
