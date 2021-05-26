/**
 * @description
 * 회원 LogIn Session 관리를 위한 Redis 사용
 * - JWT로 생성되는 token 저장
 *
 * 참고
 * - 기본세팅; redislabs.com/solutions/use-cases
 * - JWT-Vue-Redis; https://m.blog.naver.com/PostView.naver?blogId=1ilsang&logNo=221556402323&proxyReferer=https:%2F%2Fwww.google.com%2F
 * @todo
 * - express app.use(session(sessionConfigs))
 */
// import express from 'express';
import { RedisConnOptions, secretKey } from '../../config/db';
import connector from 'connect-redis';
import session from 'express-session';
// import redis from 'redis';

// const redisClient = redis.createClient();
// const redisStore = connector(session);

// const { host, port } = RedisConnOptions;
// const store = new redisStore({ host, port, client: redisClient });

// const sessionConfigs = { secret: secretKey, store, saveUninitialized: false, resave: false };

// export {}
