import { resolve } from 'path';
import { config } from 'dotenv';

config({ path: resolve(__dirname, '../.market.env') });

/** @description Constants for MarketStack */
export const MarketStackConfigs = {
  access_key: process.env.MARKETSTACK_ACCESS,
  baseUrl: `http://api.marketstack.com/v1/eod`,
} as const;

/** @description Config for Polygon.io */
export const PolygonConfigs = {
  ACCESS_KEY: process.env.POLYGON_ACCESS,
};

/** 밀리세컨 단위 */
const HOUR_ONE = 60 * 60 * 1000;
const DAY_ONE = 24 * HOUR_ONE;
const WEEK_ONE = DAY_ONE * 7;
const YEAR_ONE = DAY_ONE * 365;

export const times = {
  /** server data caching 60s */
  caching: 60,
  /** server-sent-event 15s */
  sse: 15,
  /** 2 years (ms 단위) */
  year2: 2 * YEAR_ONE,
} as const;

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

export const MarketStackQueies = {
  access_key: `access_key`,
  symbols: `symbols`,
  exchange: `exchange`,
  date_to: `date_to`,
  date_from: `date_from`,
  interval: `interval`,
  duration: `duration`,
  sort: `sort`,
  limit: `limit`,
  offset: `offset`,
} as const;
