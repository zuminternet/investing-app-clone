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
import { createClient, RedisClient } from 'redis';

class Redis {
  private _session;
  private client: RedisClient;

  constructor() {
    this.connect();
  }

  private connect() {
    this.client = createClient(RedisConnOptions);
    const redisStore = redisConn(session);
    this._session = session({
      secret: SECRET_KEY,
      store: new redisStore({ client: this.client }),
      saveUninitialized: true,
      resave: false,
    });
  }

  get session() {
    return this._session;
  }

  public setValue(key: string, value: string) {
    try {
      const reply = this.client.set(key, value);
      return reply.toString() === 'OK' ? true : false;
    } catch (e) {
      return console.error(e);
    }
  }

  public getValue(key: string) {
    try {
      const reply = this.client.get(key);
      const result = reply.toString();
      return result;
    } catch (e) {
      return console.error(e);
    }
  }

  public delete(key: string) {
    try {
      const reply = this.client.del(key);
      return reply.toString() === 'OK' ? true : false;
    } catch (e) {
      return console.error(e);
    }
  }
}

export const redis = new Redis();
