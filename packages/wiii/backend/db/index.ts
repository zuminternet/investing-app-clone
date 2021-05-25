/**
 * @description
 * DB 관련 로직 구현
 * - typeorm - connections
 */

import { MongoDBConnOptions, MySQLConnOptions } from '../config/db';
import { Connection, createConnections } from 'typeorm';
import MongoDBDao from './dao/mongodb';
import MySQLDao from './dao/mysql';

export const getConnections = async (): Promise<Connection[]> => {
  try {
    const conn = await createConnections([MySQLConnOptions, MongoDBConnOptions]);
    new MySQLDao();
    new MongoDBDao();
    return conn;
  } catch (e) {
    console.error(e);
    return;
  }
};

export const getRedisConnection = () => {
  //
};
