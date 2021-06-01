import { marketsFullUrl } from '../../../domain/apiUrls';
import { GetHistoricalOptions } from '../../../domain/apiOptions';

/**
 * EventSource Service
 * @description
 * - EventSource Service 클래스
 * - Server-Sent-Event 받아서 차트 데이터 업데이트
 * - getter로 데이터 반환
 */
export default class EsService {
  url: string;
  private observer: object;
  private es: EventSource;
  private location: string;

  constructor(query: GetHistoricalOptions, dataCarrier: ProxyConstructor) {
    this.url = this.setUrl(query);
    this.observer = dataCarrier;
    this.location = location.href;

    /**
     * 차트는 historical data만 요청
     * @example http://localhost:8080/api/markets/hist?type=stocks&ticker=005930
     */
    this.es = new EventSource(this.url);

    this.addEventListers();
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

  /** 서버 연결 시 로직.. */
  private onOpen() {
    console.info(`[SSR:Client] Connection Opened`);
  }

  private onMessage({ data }) {
    /** 페이지 이동시 종료 */
    if (this.location !== location.href) this.onClose();

    try {
      const result = Object.freeze(JSON.parse(data));
      this.observer['data'] = result;
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
