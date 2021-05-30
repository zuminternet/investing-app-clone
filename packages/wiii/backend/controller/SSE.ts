import { Response } from 'express'

import { MarketService } from '../service/MarketService'
import { times } from '../config/market'

/**
 * SSE
 * @description
 * Server Sent Event
 * 실시간 데이터 - socket 대신 20초 간격 캐싱 데이터 전송
 * @see https://www.woolha.com/tutorials/node-js-sse-server-sent-events-example-javascript-client 참고
 */
export default class SSE {
  res: Response<any, Record<string, any>>;
  options: any;

  constructor(res: Response, options) {
    /** @todo */
    this.res = res;
    this.options = options;

    this.res.status(200).set({
      /** EventSource 활용 위한 연결 지속 */
      Connection: 'keep-alive',
      /** EventSource 활용 위한 text타입 전송 */
      'Content-Type': 'text/event-stream',
      /** 지정 초(15s)까지 public caching 허용 */
      'Cache-Control': `public, max-age=${times.sse}`,
      /** CORS 허용 */
      'Access-Control-Allow-Origin': '*',
    });

    this.write();
    // (async () => await this.write())();

    /** 15초 간격 SSE */
    const eventSourceInterval = setInterval(async () => {
      await this.write();
    }, /** 15s */ times.sse * 1_000);

    /** 연결 끊어지는 경우 */
    this.res.end(() => clearInterval(eventSourceInterval));
  }

  private async write() {
    console.info('%c[SSE] Writing..', 'color: red;');
    let data = await MarketService.getHistorical(this.options);
    this.res.write(`data: ${JSON.stringify(data)}\n\n`);
  }
}
