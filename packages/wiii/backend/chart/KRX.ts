import axios, { AxiosRequestConfig, AxiosStatic } from 'axios'

import { GetHistoricalOptions } from '../../domain/apiOptions'
import { MarketStackConfigs } from '../config/market'
import { pipe } from '../utils/HOF'
import { getDateString } from '../../domain/date'

// declare const axios: AxiosStatic;

const { access_key, baseUrl } = MarketStackConfigs;

/**
 * setSymbols
 * @description
 * ticker validator
 * ticker는 6자리 숫자 코드로 입력해야 함
 * @param options
 * @returns
 */
const setSymbols = (options: GetHistoricalOptions) => {
  const { ticker } = options;
  let trimed = ticker.trim();

  /** 예외처리 */
  const symbolLength = 6;
  if (!trimed || isNaN(+trimed) || symbolLength !== trimed.length) return {};

  return { ...options, symbols: `${trimed}.XKRX` };
};

/**
 * setDefaultValues
 * @description
 * params 기본값 설정
 * - interval, sort, limit, offset은 없어도 API default값 사용하게 됨
 * @param options
 * @returns
 */
const setDefaultValues = (options) => {
  if (!Object.keys(options).length) return {};

  let { dateFrom, dateTo } = options;
  const curDate = new Date();
  const curDateStr = getDateString(curDate);

  /** 현재 날짜로 */
  if (!dateTo || !dateTo.trim()) dateTo = curDateStr;
  /** 오늘로부터 2년전 데이터; 유료 API => 잦은 요청보다는 한번에 최대한 많은 데이터 요청이 낫다고 판단 */
  if (!dateFrom || !dateFrom.trim()) dateFrom = getDateString(Number(curDate) - 2 * 365 * 24 * 60 * 60 * 1000);

  return {
    ...options,
    date_to: dateTo,
    date_from: dateFrom,
    /** 한국거래소 */
    exchange: `XKRX`,
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
  const { symbols, exchange, date_to, date_from, interval, duration, sort, limit, offset } = options;
  return {
    access_key,
    symbols,
    exchange,
    date_to,
    date_from,
    interval,
    duration,
    sort,
    limit,
    offset,
  };
};

/**
 * setParams
 * @param options GetHistoricalOptions 그대로 입력
 * @returns API가 요구하는 params에 맞게 변형하는 pipe 함수
 */
const setParams = (options: GetHistoricalOptions) => pipe(options, setSymbols, setDefaultValues, addAccessKey);

/**
 * adjustPrices
 * @param data axiosResponse data, API에서 제공하는 원본 데이터
 * @returns 원본 데이터 + Chart 그리기 편하도록 조정된 데이터
 */
const adjustPrices = (data: object) => {
  const adjusted = {
    //
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
export const fetchHistoricalData = (options: GetHistoricalOptions) => {
  const params = setParams(options);
  if (!params) return;

  const config = {
    params,
    responseType: 'json',
    maxRedirects: 3,
    transformResponse: [adjustPrices],
  } as AxiosRequestConfig;

  return axios.get(baseUrl, config);
};
