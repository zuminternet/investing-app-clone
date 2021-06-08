import { config } from 'dotenv';
import { resolve } from 'path';
import { ConnectionOptions } from 'typeorm';
import { IS_PRO_MODE } from '../../domain/utilFunc';

config({ path: resolve(__dirname, '../.market.env') });

export enum DBName {
  redis = 'redis',
  mongoDB = 'mongodb',
}

const BASE_CHARSET = 'utf8mb4_general_ci' as const;

export const secretKey = process.env.SECRETKEY;

export const RedisConnOptions = {
  host: process.env.DOCKER_REDIS_HOST,
  port: process.env.DOCKER_REDIS_PORT,
} as const;

export const MongoDBConnOptions: ConnectionOptions = {
  name: DBName.mongoDB,
  type: DBName.mongoDB,
  database: process.env.DOCKER_MONGO_DB,
  username: process.env.DOCKER_MONGO_USER,
  password: process.env.DOCKER_MONGO_PASS,
  logging: true,
  synchronize: process.env.NODE_ENV === 'production' ? false : true,
} as const;
