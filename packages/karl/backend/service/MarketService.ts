import { Service } from 'zum-portal-core/backend/decorator/Alias';
import { Caching } from 'zum-portal-core/backend/decorator/Caching';
import axios from 'axios';

import { marketStackConfig } from '../../../common/backend/config';
import { times } from '../domain/date';
import { isProductionMode } from '../domain/utils';

enum StockSymbols {
  MSFT = 's', // 마이크로 소프트
  AAPL = 's', // 애플
  AMZN = 's', // 아마존
  FB = 's', // 페이스북
  JPM = 's', // JP 모건
}

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
    const { data: result } = await axios.get(`http://api.marketstack.com/v1/tickers`, {
      params: {
        access_key: accessKey,
      },
    });

    const { data: stocks } = result;
    const displayedStocks = [];

    stocks.forEach((stock) => {
      if (StockSymbols[stock.symbol]) {
        displayedStocks.push(stock);
      }
    });

    console.log(displayedStocks);

    if (displayedStocks) {
      return displayedStocks;
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
