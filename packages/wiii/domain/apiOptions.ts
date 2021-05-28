export interface GetHistoricalOptions {
  /** - 타입: 주식, 지수, 코인 */
  type: string;
  /** - 종목코드 alias symbols */
  ticker: string;
  /** - 거래소코드: 국내주식 XKRX */
  exchange: string;
  /** - 기간 시점 */
  dateFrom: string;
  /** - 기간 종점 */
  dateTo: string;
  /** - 간격; 1 (default) */
  interval: number;
  /** interval 적용할 단위; day(default), hour, min, week */
  duration: string;
  /** - sort: DESC (default), ASC */
  sort: string;
  /** 요청 데이터 갯수 최대치 */
  limit: string;
  /** pagination 지원하는 경우, 총 페이지 수. ex. 데이터 100개 요청 10개 페이지 => offset = 10 */
  offset: string;
}
