import { IAggV2Formatted } from '@polygon.io/client-js/lib/rest/stocks/aggregates';

/**
 * @description
 * 국내 주식 historical 데이터
 * open: 80300
 * close: 80500
 * adj_close: 80500
 * high: 80600
 * low: 79600
 * volume: 13263445
 * date: "2021-05-31T00:00:00+0000"
 */
export interface CandleOne {
  open: number;
  close: number;
  adj_close: number;
  high: number;
  low: number;
  volume: number;
  date: string;
}

export interface ClientWH {
  ratio: number;
  canvasWidth: number;
  canvasHeight?: number;
}

export interface refinerOptions extends ClientWH {
  count: number;
  range: Generator<number, void, any>;
  total?: number;
  customNumToShow?: number;
}

/** Chart 만들기 편하게 전처리된 캔들 데이터 */
export interface RefinedCandle {
  startX: number;
  centerX: number;
  openY: number;
  rectH: number;
  highY: number;
  lowY: number;
  color: string;
}

export type CandleData = CandleOne[];
export interface RefinedCandleData {
  data: RefinedCandle[];
  candleWidth: number;
}

/**
 * Polygon Multiday
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
export interface MultidaysStockData {
  dataKey?: string;
  results?: IAggV2Formatted[];
  resultsCount?: number;
}
