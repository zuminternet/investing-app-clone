import { Response } from 'express';

/**
 * SSE
 * @description
 * Server Sent Event
 * 실시간 데이터 - socket 대신 20초 간격 캐싱 데이터 전송
 * @see https://www.woolha.com/tutorials/node-js-sse-server-sent-events-example-javascript-client 참고
 */
export default class SSE {
  res: Response<any, Record<string, any>>;

  constructor(res: Response) {
    /** @todo */
    this.res = res;
    this.res.setDefaultEncoding('utf-8');
    this.res.status(200).set({
      /** EventSource 활용 위한 연결 지속 */
      Connection: 'keep-alive',
      /** EventSource 활용 위한 text타입 전송 */
      'Content-Type': 'text/event-stream',
      /** 15s까지 public caching 허용 */
      'Cache-Control': 'public, max-age=15',
      /** CORS 허용 */
      'Access-Control-Allow-Origin': '*',
    });
  }

  public write(data: object) {
    this.res.write(`data: ${JSON.stringify(data)}\n\n`);
  }
}
