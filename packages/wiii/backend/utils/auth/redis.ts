/**
 * @description
 * 회원 LogIn Session 관리를 위한 Redis 사용
 * - JWT로 생성되는 token 저장
 *
 * 참고
 * @see https://redislabs.com/solutions/use-cases 기본세팅
 * @see https://m.blog.naver.com/PostView.naver?blogId=1ilsang&logNo=221556402323&proxyReferer=https:%2F%2Fwww.google.com%2F JWT-Vue-Redis
 * @todo
 * - express app.use(session(sessionConfigs))
 * - add `@types/redis`
 */

import { SECRET_KEY, RedisConnOptions } from '../../config/db';
import session from 'express-session';
import redisConn from 'connect-redis';
import { createClient } from 'redis';

class Redis {
  private _session;
  private client;

  constructor() {
    this.connect();
  }

  private connect() {
    this.client = createClient(RedisConnOptions);
    const redisStore = redisConn(session);
    this._session = session({ secret: SECRET_KEY, store: new redisStore(this.client), saveUninitialized: true, resave: false });
  }

  get session() {
    return this._session;
  }

  public setValue(key, value) {
    const result = this.client.set(key, value, (err, reply) => {
      /** @todo error */
      if (err) throw new Error(err);
      console.log({ reply });
      if (reply.toString('utf8') === 'OK') return true;
    });
    console.table({ result });
  }

  public getValue(key) {
    const result = this.client.get(key, (err, reply) => {
      /** @todo error */
      if (err) throw new Error(err);
      console.log({ reply });
      if (reply.toString('utf8') === 'OK') return true;
    });
    console.table({ result });
  }

  public delete(key) {
    // const result = this.client.del(key, (err, reply) => {
    //   /** @todo error */
    //   if (err) throw new Error(err);
    //   console.log({ reply });
    //   if (reply.toString('utf8') === 'OK') return true;
    // });
    // console.table({ result });
  }
}

export default new Redis();
