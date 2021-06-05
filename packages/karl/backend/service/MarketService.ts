import { Service } from 'zum-portal-core/backend/decorator/Alias';
import { Caching } from 'zum-portal-core/backend/decorator/Caching';
import axios from 'axios';
import * as yahooFinance from 'yahoo-finance';
import { investing } from 'investing-com-api';

import { marketStackConfig } from '../../../common/backend/config';
import { times } from '../domain/date';
import { isProductionMode } from '../domain/utils';

interface InvestingData {
  date: number;
  value: number;
}

export interface InvestingApiResponse {
  key: string;
  value: number;
  diff: number;
  growthRate: number;
  // date: string;
}

enum StockSymbols {
  AAPL = 'equities/apple-computer-inc', // 애플
  AMZN = 'equities/amazon-com-inc', // 아마존
  FB = 'equities/facebook-inc', // 페이스북
  JPM = 'equities/jp-morgan-chase', // JP 모건
}

@Service()
export default class MarketService {
  constructor() {}

  private callInvesting(key, investingId) {
    return new Promise<InvestingApiResponse>((resolve, reject) => {
      investing(investingId)
        .then((result: InvestingData[]) => {
          console.log(investingId, 'investingId');

          const { value: newValue, date } = result.pop();
          const { value: oldValue } = result.pop();
          const diff = newValue - oldValue;
          const growthRate = (diff / newValue) * 100;
          resolve({ key, value: newValue, diff, growthRate });
        })
        .catch(reject);
    });
  }

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

    for (let i = 0; i < stocks.length; i++) {
      if (StockSymbols[stocks[i].symbol]) {
        const key = stocks[i].symbol;
        const investingId = StockSymbols[stocks[i].symbol];
        const investingData = await this.callInvesting(key, investingId);

        displayedStocks.push({ ...stocks[i], ...investingData });
      }
    }

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
