import { IAggregateQuery } from '@polygon.io/client-js';

/**
 * PolygonProps
 * @description
 * polygon.io API에서 공통으로 사용되는 props interface
 * @property ticker; 종목명
 * @property query
 *   - unadjusted
 *   - sort: 'asc' | 'desc'
 *   - limit: 요청 캔들 갯수, aggregate에서 활용, default 5000, Max 50000
 */
export interface PolygonProps {
  query?: IAggregateQuery;
}

/**
 * @description
 * GroupedDaily에서 사용
 */
export interface GetDateProps extends PolygonProps {
  date: string;
}

/**
 * @description
 * PreviousClose에서 사용
 */
export interface GetTickerProps extends PolygonProps {
  ticker: string;
}

/**
 * @description
 * DailyOpen/Close에서 사용
 */
export interface GetDateTickerProps extends GetDateProps, GetTickerProps {}

export enum TimespanEnum {
  minute = 'minute',
  hour = 'hour',
  day = 'day',
  week = 'week',
  month = 'month',
  quarter = 'quarter',
  year = 'year',
}

/**
 * @description
 * aggregates에서 사용
 * @property multiplier
 * - 일봉, 분봉, 주봉 등 몇개씩 묶을건지
 * - ex. 1일봉, 5분봉 등
 * @property timespan
 * - 주기
 * @property from, to
 * - YYYY-MM-DD 형식
 */
export interface GetMultiDaysStockProps extends GetTickerProps {
  multiplier: number;
  timespan: TimespanEnum;
  from?: string;
  to?: string;
}
