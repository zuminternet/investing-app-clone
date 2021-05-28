import { Service } from 'zum-portal-core/backend/decorator/Alias';
import { Caching } from 'zum-portal-core/backend/decorator/Caching';
import { GetHistoricalOptions } from 'domain/apiOptions';
import { fetchHistoricalData } from '../chart/KRX';

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
   * 파일럿 프로젝트에서는 무료 api를 사용하므로 사용량 제한 위해 캐싱 사용
   */
  @Caching({
    /** 1분 단위 실행 */
    refreshCron: `0/60 * * * * *`,
    /** 1분 단위 캐싱 */
    ttl: 60,
    runOnStart: false,
    unless: (result) => !result,
  })
  public async getHistorical(options: GetHistoricalOptions) {
    try {
      const { data, status, statusText } = await fetchHistoricalData(options);
      if (status > 400) throw new Error(statusText);
      return data;
    } catch (e) {
      console.error(e);
      return;
    }
  }
}
