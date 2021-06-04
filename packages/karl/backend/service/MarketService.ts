import { Service } from 'zum-portal-core/backend/decorator/Alias';
import { Caching } from 'zum-portal-core/backend/decorator/Caching';
import axios from 'axios';

import { marketStackConfig } from '../../../common/backend/config';
import { times } from '../domain/date';
import { isProductionMode } from '../domain/utils';

@Service()
export default class MarketService {
  constructor() {}

  /**
   * @description home page에 렌더링할 stock들을 가져오는 service
   * @returns stock과 pagination을 담은 Object
   */

  @Caching({
    /** 개발모드에서는 1시간에 한 번만 실행 */
    refreshCron: isProductionMode ? `30 * * * * *` : `1 * * *`,
    /** 캐싱 기간 초 단위 */
    ttl: isProductionMode ? times.caching : times.caching * 60,
    runOnStart: false,
    unless: (result) => !result,
  })
  public async getStocks() {
    const { accessKey } = marketStackConfig;
    const { data: stocks } = await axios.get(`http://api.marketstack.com/v1/tickers?access_key=${accessKey}`);

    if (stocks) {
      return stocks;
    }

    throw new Error('getting stocks was failed in MarketService');
  }

  /**
   * @description home page에 렌더링할 indices를 가져오는 service
   */

  public async getIndices() {}

  /**
   * @description home page에 렌더링할 crypto currencies를 가져오는 service
   */
  public async getCryptoCurrencies() {}
}
