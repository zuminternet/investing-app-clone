import { resolve } from 'path';
import { config } from 'dotenv';

config({ path: resolve(__dirname, './.market.env') });

/** @description Constants for MarketStack */
export const MarketStackConfigs = {
  access_key: process.env.MARKETSTACK_ACCESS,
  baseUrl: `http://api.marketstack.com/v1/eod`,
} as const;

export const FinnhubConfigs = {
  BASE: `https://finnhub.io/api/v1/`,
  ACCESS_KEY: process.env.FINNHUB_ACCESS,
  KOSPI_SUFFIX: '.KS',
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
