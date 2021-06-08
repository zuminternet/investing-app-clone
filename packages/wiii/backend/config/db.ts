import { config } from 'dotenv';
import { resolve } from 'path';
import { ConnectionOptions } from 'typeorm';
import { IS_PRO_MODE } from '../../domain/utilFunc';
import { User } from '../db/entity/User.entity';

config({ path: resolve(__dirname, './.db.env') });

const BASE_CHARSET = 'utf8mb4_general_ci' as const;

export const SECRET_KEY = process.env.SECRET_KEY;

export const SALT_ROUND = Number(process.env.SALT_ROUND);

export const RedisConnOptions = {
  host: process.env.DOCKER_REDIS_HOST,
  port: process.env.DOCKER_REDIS_PORT,
} as const;

export const MongoDBConnOptions: ConnectionOptions = {
  type: 'mongodb',
  host: process.env.DOCKER_MONGO_HOST,
  port: +process.env.DOCKER_MONGO_PORT,
  database: process.env.DOCKER_MONGO_DB,
  username: process.env.DOCKER_MONGO_USER,
  password: process.env.DOCKER_MONGO_PASS,
  logging: true,
  cache: true,
  entities: [User],
  // synchronize: process.env.NODE_ENV === 'production' ? false : true,
};
