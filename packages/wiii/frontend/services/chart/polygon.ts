import { polygonAPIKey } from '@/config/index';
import { GetMultiDaysStockProps } from '@/type/apis';
import { MultidaysStockData } from '@/type/chart';
import { ICryptoClient, IStocksClient, restClient } from '@polygon.io/client-js';

/**
 * @class
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
  public async getMultiDaysStockData(props: GetMultiDaysStockProps): Promise<MultidaysStockData> {
    const { ticker, multiplier, timespan, from, to, query } = props;
    if (!ticker) return;
    try {
      const { results, resultsCount } = await this.stocks.aggregates(ticker, multiplier, timespan, from, to, query);

      const dataKey = `${ticker}-${multiplier}${timespan}-${new Date().getMinutes()}`;
      /**
       * @todo
       * 예외 처리 또는 추가 로직?
       */

      return { dataKey, results, resultsCount };
    } catch (e) {
      console.error(e);
      return;
    }
  }
}

export default new PolygonAPI();
