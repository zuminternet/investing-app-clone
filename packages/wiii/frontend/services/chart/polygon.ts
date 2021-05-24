import { polygonAPIKey } from '@/config/index';
import { GetMultiDaysStockProps } from '@/type/apis';
import { getDateString } from '@/utils/date';
import { IAggResponseFormatted, ICryptoClient, IStocksClient, restClient } from '@polygon.io/client-js';

/**
 * @classdesc
 * polygon.io RESTful API를 사용해 주가, Crypto 시세 및 종목정보 데이터 가져오는 class
 * - free-tier 관련 API만 활용
 */
class PolygonAPI {
  private stocks: IStocksClient;
  private crypto: ICryptoClient;

  constructor() {
    const { stocks, crypto } = restClient(polygonAPIKey);
    this.stocks = stocks;
    this.crypto = crypto;
  }

  /**
   * @description
   * 미국 주식 종가 데이터 api 호출
   * - base: https://api.polygon.io/v2/
   *  - aggs/ticker/`AAPL`/
   *  - range/
   *    - multiplier: `1`/
   *    - timespan: `day`/
   *  - from: `2020-10-14`/
   *  - to: `2020-10-14`
   *  - query:
   *    - ?unadjusted=true
   *    - &sort=asc
   *    - &limit=120
   *    - &apiKey=
   * @see
   * - https://polygon.io/docs/get_v2_aggs_ticker__stocksTicker__range__multiplier___timespan___from___to__anchor
   * - https://github.com/polygon-io/client-js/blob/master/src/rest/stocks/aggregates.ts
   */
  public async getMultiDaysStockData(props: GetMultiDaysStockProps) {
    const { ticker, multiplier, timespan, from, to = getDateString(), query } = props;
    if (!ticker) return;
    try {
      const { results, resultsCount } = await this.stocks.aggregates(ticker, multiplier, timespan, from, to, query);

      /**
       * @todo
       * 예외 처리 또는 추가 로직?
       */

      return { results, resultsCount };
    } catch (e) {
      console.error(e);
      return;
    }
  }
}

export default new PolygonAPI();
