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
  date: string;
}

enum StockSymbols {
  AAPL = 'equities/apple-computer-inc', // 애플
  AMZN = 'equities/amazon-com-inc', // 아마존
  FB = 'equities/facebook-inc', // 페이스북
  JPM = 'equities/jp-morgan-chase', // JP 모건
}

enum indicesSymbols {
  DOW_JONES_30 = 'indices/us-30', // 다우 존스
  NASDAQ_100 = 'indices/nq-100', // 나스닥
  FRANCE_40 = 'indices/france-40', // 프랑스 지수
  NIKKEI_255 = 'indices/japan-ni225', // 니케이
}

enum cryptoSymbols {
  BIT_COIN = 'crypto/bitcoin/btc-usd', // 비트코인
  ETHEREUM = 'crypto/ethereum/eth-usd?c997650', // 이더리움
  IOTA = 'crypto/iota/iota-usd', // IOTA
  LITE_COIN = 'crypto/litecoin/ltc-usd?c1010798', // 라이트코인
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
      if (StockSymbols[stocks[i].symbol]) {
        stocks[i].category = stocks[i].stock_exchange.acronym;
        const key = stocks[i].symbol;
        const investingId = StockSymbols[stocks[i].symbol];
        const investingData = await this.callInvesting(key, investingId);

        displayedStocks.push({ ...stocks[i], ...investingData });
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
      const indices = Object.entries(indicesSymbols);
      const displayedIndices = [];

      for (let i = 0; i < indices.length; i++) {
        const [key, investingId] = indices[i];
        const investingData = await this.callInvesting(key, investingId);

        displayedIndices.push(investingData);
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
  public async getCryptos() {
    try {
      const cpyptos = Object.entries(cryptoSymbols);
      const displayedCryptos = [];

      for (let i = 0; i < cpyptos.length; i++) {
        const [key, investingId] = cpyptos[i];
        const investingData = await this.callInvesting(key, investingId);

        displayedCryptos.push(investingData);
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
