import { resolve } from 'path'
import { config } from 'dotenv'

config({ path: resolve(__dirname, '../.env.market') });

/** @description Constants for MarketStack */
export const MarketStackConfigs = {
  access_key: process.env.MARKETSTACK_ACCESS,
  baseUrl: `http://api.marketstack.com/v1/eod`,
} as const;

/** @description Config for Polygon.io */
export const PolygonConfigs = {
  ACCESS_KEY: process.env.POLYGON_ACCESS,
};

export const enum times {
  /** server data caching 60s */
  caching = 60,
  /** server-sent-event 15s */
  sse = 15,
}

export const enum DurationEnum {
  DAY = `day`,
  HOUR = `hour`,
  MIN = `min`,
  WEEK = `week`,
  MONTH = `month`,
  YEAR = `year`,
}

export const enum SortEnum {
  DESC = `DESC`,
  ASC = `ASC`,
}
