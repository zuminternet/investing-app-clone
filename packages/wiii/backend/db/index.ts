/**
 * @description
 * DB 관련 로직 구현
 * - typeorm - connections
 */

import { MongoDBConnOptions } from '../config/db';
import { Connection, createConnection } from 'typeorm';
// import MongoDBDao from './dao/mongodb';
// import MySQLDao from './dao/mysql';
// import { getConnections } from './index';
export const getMongoConnection = async () => {
  try {
    const conn = await createConnection(MongoDBConnOptions);
    console.info(`MongoDB Connected`, { conn });
    // new MySQLDao();
    // new MongoDBDao();
    return conn;
  } catch (e) {
    return console.error(e);
  }
};

const getRedisConnection = () => {
  //
};

// export {
// getConnections,
// getRedisConnection
// }
