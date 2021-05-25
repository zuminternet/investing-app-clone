import dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';

dotenv.config();

export enum DBName {
  mysql = 'mysql',
  redis = 'redis',
  mongoDB = 'mongodb',
}

const BASE_CHARSET = 'utf8mb4_general_ci' as const;

export const secretKey = process.env.SECRETKEY;

export const MySQLConnOptions: ConnectionOptions = {
  name: DBName.mysql,
  type: DBName.mysql,
  host: process.env.DEV_MYSQL_HOST,
  port: Number(process.env.DEV_MYSQL_PORT),
  database: process.env.DEV_MYSQL_DB,
  username: process.env.DEV_MYSQL_USER,
  password: process.env.DEV_MYSQL_PASS,
  logging: true,
  synchronize: process.env.NODE_ENV === 'production' ? false : true,
  charset: BASE_CHARSET,
} as const;

export const RedisConnOptions = {
  host: process.env.DEV_REDIS_HOST,
  port: process.env.DEV_REDIS_PORT,
  database: process.env.DEV_REDIS_DB,
  password: process.env.DEV_REDIS_PASS,
} as const;

export const MongoDBConnOptions: ConnectionOptions = {
  name: DBName.mongoDB,
  type: DBName.mongoDB,
  database: process.env.DEV_MONGO_DB,
  username: process.env.DEV_MONGO_USER,
  password: process.env.DEV_MONGO_PASS,
  logging: true,
  synchronize: process.env.NODE_ENV === 'production' ? false : true,
} as const;

export const mongodbUrl = (user: String, pass: String, db: String): String =>
  `mongodb+srv://${user}:${pass}@investing.ikmxr.mongodb.net/${db}?retryWrites=true&w=majority`;
