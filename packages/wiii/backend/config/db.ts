// import dotenv from 'dotenv';
// dotenv.config();

export const secretKey = '';

export const devMySQL = {
  host: process.env.DEV_MYSQL_HOST,
  port: process.env.DEV_MYSQL_PORT,
  db: process.env.DEV_MYSQL_DB,
  user: process.env.DEV_MYSQL_USER,
  pass: process.env.DEV_MYSQL_PASS,
} as const;

export const devRedis = {
  host: process.env.DEV_REDIS_HOST,
  port: process.env.DEV_REDIS_PORT,
  db: process.env.DEV_REDIS_DB,
  pass: process.env.DEV_REDIS_PASS,
} as const;

export const devMongoDB = {
  db: process.env.DEV_MONGO_DB,
  user: process.env.DEV_MONGO_USER,
  pass: process.env.DEV_MONGO_PASS,
} as const;

export const mongodbUrl = (user: String, pass: String, db: String): String =>
  `mongodb+srv://${user}:${pass}@investing.ikmxr.mongodb.net/${db}?retryWrites=true&w=majority`;
