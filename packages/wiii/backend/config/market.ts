import { resolve } from 'path';
import { config } from 'dotenv';

config({ path: resolve(__dirname, './.market.env') });

/** @description Constants for MarketStack */
export const MarketStackConfigs = {
  access_key: process.env.MARKETSTACK_ACCESS,
  baseUrl: `http://api.marketstack.com/v1/eod`,
} as const;

/** @description Config for Polygon.io */
export const PolygonConfigs = {
  ACCESS_KEY: process.env.POLYGON_ACCESS,
};

export const AlphaConfigs = {
  ACCESS_KEY: process.env.ALPHA_ACCESS,
};

export const FinnhubConfigs = {
  ACCESS_KEY: process.env.FINNHUB_ACCESS,
};

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
