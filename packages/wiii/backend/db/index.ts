/**
 * @description
 * DB 관련 로직 구현
 * - typeorm - connections
 */
import { MongoDBConnOptions, RedisConnOptions } from '../config/db';
import { createConnection } from 'typeorm';
import { createClient } from 'redis';
const { host, port } = RedisConnOptions;

export const getMongoConnection = async () => {
  try {
    const conn = await createConnection(MongoDBConnOptions);
    return conn;
  } catch (e) {
    return console.error(e);
  }
};

export const getRedisConnection = () => {
  try {
    const client = createClient(port, host);
    console.info(`[DB] Redis Connected`);
    return client;
  } catch (e) {
    return console.error(e);
  }
};
