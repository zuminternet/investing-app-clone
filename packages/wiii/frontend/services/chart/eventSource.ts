import { CanvasOptionEnum } from '@/type/chart'

import { marketsFullUrl } from '../../../domain/apiUrls'
import { GetHistoricalOptions } from '../../../domain/apiOptions'

/**
 * EventSource Service
 * @description
 * - EventSource Service 클래스
 * - Server-Sent-Event 받아서 차트 데이터 업데이트
 */
export default class EsService {
  target: any;
  url: string;
  es: EventSource;
  ctx: CanvasRenderingContext2D;
  location: string;

  /**
   * target: Chart에선 ctx가 타겟 노드로 주어짐
   */
  constructor(target, query: GetHistoricalOptions) {
    this.target = target;
    this.url = this.setUrl(query);
    this.location = location.href;

    /**
     * 차트는 historical data만 요청
     * @example http://localhost:8080/api/markets/hist?type=stocks&ticker=005930
     */
    this.es = new EventSource(this.url);

    this.addEventListers();
  }

  /**
   * createChart
   */
  public createChart() {
    /** @todo */
    this.ctx = this.target.getContext(CanvasOptionEnum.context2d, { alpha: 1 }) as CanvasRenderingContext2D;
  }

  /**
   * sourceUrl
   * @description
   * undefined로 들어온 쿼리만 제거하고 나머지 예외처리는 서버에서 담당
   */
  private setUrl(query: GetHistoricalOptions) {
    const entries = Object.entries(query);

    const adjusted = {};
    for (const [key, value] of entries) {
      /** value는 모두 string으로 들어오므로 `0`도 true로 인식 */
      if (value !== undefined) adjusted[key] = value;
    }
    const params = new URLSearchParams({ ...adjusted }).toString();

    return `${marketsFullUrl.historical}?${params}`;
  }

  private addEventListers() {
    this.es.addEventListener(`error`, this.onError.bind(this));
    this.es.addEventListener(`open`, this.onOpen.bind(this));
    this.es.addEventListener(`message`, this.onMessage.bind(this));
  }

  private onOpen() {
    /** @todo 서버 연결 시 로직.. */
    console.info(`[SSR:Client] Connection Opened`);
  }

  private onMessage({ data }) {
    /** 페이지 이동시 종료 */
    if (this.location !== location.href) this.onClose();

    const { pagination, data: _data } = JSON.parse(data);
    try {
      /** @todo drawBasicCandleChart */
    } catch (e) {
      console.error(e);
    }
  }

  private onError(e) {
    const {
      target: { readyState },
    } = e;
    readyState === 0
      ? console.log(`[SSE:Client] EventSource on Waiting for Server..`)
      : console.error(`[SSE:Client] EventSource on Error`);
  }

  private onClose() {
    this.es.close();
    console.info(`[SSR:Client] Connection Closed`);
  }
}
