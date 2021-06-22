import { Service } from 'zum-portal-core/backend/decorator/Alias';
import { Caching } from 'zum-portal-core/backend/decorator/Caching';
import axios from 'axios';
import { investing } from 'investing-com-api';

import { marketStackConfig } from '../../../common/backend/config';
import { times } from '../domain/date';
import { isProductionMode } from '../domain/utils';
import { tickerMap } from '../../../common/domain';

export interface InvestingData {
  date: number;
  value: number;
}

export interface InvestingApiResponse {
  key: string;
  value: number;
  diff: number;
  growthRate: number;
  date: string;
}

const { accessKey } = marketStackConfig;

@Service()
export default class MarketService {
  constructor() {}

  private callInvesting(key, investingId) {
    return new Promise<InvestingApiResponse>((resolve, reject) => {
      investing(investingId)
        .then((result: InvestingData[]) => {
          const { value: newValue, date } = result.pop();
          const { value: oldValue } = result.pop();
          const diff = newValue - oldValue;
          const growthRate = (diff / newValue) * 100;
          resolve({ key, value: newValue, diff, growthRate, date: this.getDateString(date) });
        })
        .catch(reject);
    });
  }

  private getDateString(timeStamp: number) {
    const date = new Date(timeStamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
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
    const { data: result } = await axios.get(`http://api.marketstack.com/v1/tickers`, {
      params: {
        access_key: accessKey,
      },
    });

    const { data: stocks } = result;
    const displayedStocks = [];

    for (let i = 0; i < stocks.length; i++) {
      const key = stocks[i].symbol;

      if (tickerMap.stock[key]) {
        stocks[i].category = stocks[i].stock_exchange.acronym;
        const { investingId, name, category } = tickerMap.stock[key];
        const investingData = await this.callInvesting(key, investingId);

        displayedStocks.push({ ...stocks[i], ...investingData, name, category });
      }
    }

    if (displayedStocks) {
      return displayedStocks;
    }

    return false;
  }

  /**
   * @description home page에 렌더링할 indices를 가져오는 service
   */

  @Caching({
    /** 개발모드에서는 1시간에 한 번만 실행 */
    refreshCron: isProductionMode ? `30 * * * * *` : `1 * * *`,
    /** 캐싱 기간 초 단위 */
    ttl: isProductionMode ? times.caching : times.caching * 60,
    runOnStart: false,
    unless: (result) => !result,
  })
  public async getIndices() {
    try {
      const indices = Object.entries(tickerMap.index);
      const displayedIndices = [];

      for (let i = 0; i < indices.length; i++) {
        const [key, indexInfo] = indices[i];
        const { investingId, name, category } = indexInfo;

        const investingData = await this.callInvesting(key, investingId);

        displayedIndices.push({ ...investingData, name, category, symbol: key });
      }

      if (displayedIndices) {
        return displayedIndices;
      }

      return false;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @description home page에 렌더링할 crypto currencies를 가져오는 service
   */

  @Caching({
    /** 개발모드에서는 1시간에 한 번만 실행 */
    refreshCron: isProductionMode ? `30 * * * * *` : `1 * * *`,
    /** 캐싱 기간 초 단위 */
    ttl: isProductionMode ? times.caching : times.caching * 60,
    runOnStart: false,
    unless: (result) => !result,
  })
  public async getCryptos() {
    try {
      const cpyptos = Object.entries(tickerMap.crypto);
      const displayedCryptos = [];

      for (let i = 0; i < cpyptos.length; i++) {
        const [key, cryptoInfo] = cpyptos[i];
        const { investingId, name, category } = cryptoInfo;
        const investingData = await this.callInvesting(key, investingId);

        displayedCryptos.push({ ...investingData, name, category, symbol: key });
      }

      if (displayedCryptos) {
        return displayedCryptos;
      }

      return false;
    } catch (error) {
      console.log(error);
    }
  }
}
