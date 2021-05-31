import axios, { AxiosRequestConfig } from 'axios';

import { GetHistoricalOptions, MarketStackQueries } from '../../domain/apiOptions';
import { getDateString, times } from '../../domain/date';
import { MarketStackConfigs } from '../config/market';
import { pipe } from '../utils/HOF';

const { access_key, baseUrl } = MarketStackConfigs;

/**
 * adjustKeyName
 * - querystring 에서 undefined value 제거
 * - MarketStack API에서 사용되는 key 이름으로 변경
 * - Polygon.io interval과 다름에 주의!!
 * @param options client에서 입력된 querystring(options) object
 * @returns undefined 제외한 나머지 query 모음
 */
const adjustKeyName = (options: GetHistoricalOptions) => {
  const entries = Object.entries(options);
  if (!entries.length) return {};

  const { symbols, date_from, date_to } = MarketStackQueries;
  const { ticker, dateTo, dateFrom } = options;
  entries.push([symbols, ticker]);
  entries.push([date_to, dateTo]);
  entries.push([date_from, dateFrom]);

  const adjusted = {};
  for (const [key, value] of entries) {
    /** value는 모두 string으로 들어오므로 `0`도 true로 인식 */
    if (value && key in MarketStackQueries) adjusted[key] = value;
  }
  return adjusted;
};

/**
 * setSymbols
 * @description
 * ticker validator
 * ticker는 6자리 숫자 코드로 입력해야 함
 * @param options
 * @returns
 */
const setSymbols = (options) => {
  const { symbols } = options;
  const trimed = symbols.trim();

  /** 예외처리 */
  const symbolLength = 6;
  if (!trimed || isNaN(+trimed) || symbolLength !== trimed.length) return {};

  return { ...options, symbols: `${trimed}.XKRX` };
};

/**
 * setDefaultValues
 * @description
 * params 기본값 설정
 * - sort, limit, offset은 없어도 API default값 사용하게 됨
 * - MarketStackAPI에서 interval은 반드시 hour || min
 * @param options
 * @returns
 */
const setDefaultValues = (options) => {
  if (!Object.keys(options).length) return {};

  let { date_from, date_to, interval } = options;
  const curDate = new Date();
  const curDateStr = getDateString(curDate);

  /** 현재 날짜로 */
  if (!date_to || !date_to.trim()) date_to = curDateStr;
  /** 오늘로부터 2년전 데이터; 유료 API => 잦은 요청보다는 한번에 최대한 많은 데이터 요청이 낫다고 판단 */
  if (!date_from || !date_from.trim()) date_from = getDateString(Number(curDate) - times.year2);
  /** interval 시간 단위 변경 */
  if (interval && interval.match(`day`)) interval = `24hour`;

  return {
    ...options,
    date_to,
    date_from,
    /** 한국거래소 */
    exchange: `XKRX`,
    interval,
  };
};

/**
 * addAccessKey
 * @description
 * - access_key 추가,
 * @param options
 * @returns
 */
const addAccessKey = (options) => {
  if (!Object.keys(options).length) return {};

  return {
    ...options,
    access_key,
  };
};

/**
 * setParams
 * @param options GetHistoricalOptions 그대로 입력
 * @returns API가 요구하는 params에 맞게 변형하는 pipe 함수
 */
const setParams = (options: GetHistoricalOptions) => pipe(options, adjustKeyName, setSymbols, setDefaultValues, addAccessKey);

/**
 * adjustPrices
 * @param data axiosResponse data, API에서 제공하는 원본 데이터
 * @returns 원본 데이터 + Chart 그리기 편하도록 조정된 데이터
 */
const adjustPrices = (data: object) => {
  const adjusted = {
    /** @todo */
  };
  return { origin: data, adjusted };
};

/**
 * fetchHistoricalData
 * @description
 * 국내 주식 chart 생성을 위한 데이터 요청
 * - http://api.marketstack.com/v1/eod
 *   - ?access_key=xxxxxxx
 *   - &symbols=005930.XKRX : 삼성전자
 *   - &exchange=XKRX : 한국거래소
 *   - &date_from=2021-05-01 : YYYY-MM-DD
 *   - &date_to=2021-05-28
 *   - &interval= : 1hour (Default), 1min, 5min, 10min, 15min, 30min, 3hour, 6hour, 12hour, 24hour
 *   - &sort= : DESC (Default), ASC
 *   - &limit= : 100 (Default) ~ 1,000
 *   - &offset= : pagination, 0 (Default) ~
 * @param options GetHistoricalOptions
 * @returns axios 응답객체
 */
export const fetchHistoricalData = async (options: GetHistoricalOptions) => {
  const params = setParams(options);
  if (!params) return;

  const config = {
    params,
    responseType: 'json',
    maxRedirects: 1,
    // transformResponse: [adjustPrices],
  } as AxiosRequestConfig;

  return await axios.get(baseUrl, config);
};
