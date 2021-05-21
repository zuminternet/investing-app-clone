/**
 * @description
 * DB 관련 로직 구현
 * - typeorm - connections
 */

import { MySQLConnOptions, MongoDBConnOptions } from '$/config/db';
import { Connection, createConnections } from 'typeorm';

export { default as mySQLDao } from './dao/mysql';
export { default as mongoDao } from './dao/mongodb';
export { default as redisDao } from './dao/redis';

export const getConnections = async (): Promise<Connection[]> => {
  try {
    return await createConnections([MySQLConnOptions, MongoDBConnOptions]);
  } catch (e) {
    console.error(e);
    return;
  }
};

export const getRedisConnection = () => {
  //
};
