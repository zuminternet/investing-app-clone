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
import { promisify } from 'util';

class Redis {
  private _session;
  private client: RedisClient;
  private asyncGet;
  private asyncSet;
  private asyncDel;

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
    this.asyncGet = promisify(this.client.get).bind(this.client);
    this.asyncSet = promisify(this.client.set).bind(this.client);
    this.asyncDel = promisify(this.client.del).bind(this.client);
  }

  get session() {
    return this._session;
  }

  public async setValue(key: string, value: string) {
    try {
      const result = await this.asyncSet(key, value);
      return result === 'OK' ? true : false;
    } catch (e) {
      return console.error(e);
    }
  }

  public async getValue(key: string) {
    try {
      const value = await this.asyncGet(key);
      return value;
    } catch (e) {
      return console.error(e);
    }
  }

  public async delete(key: string) {
    try {
      const result = await this.asyncDel(key);
      return result === 'OK' ? true : false;
    } catch (e) {
      return console.error(e);
    }
  }
}

export const redis = new Redis();
