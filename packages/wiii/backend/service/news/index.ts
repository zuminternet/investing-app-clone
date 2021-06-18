import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { marketEnum } from '../../../domain/newsData';
import { FinnhubConfigs } from '../../config/market';

/**
 * finnhub.io API 활용
 * 1초 30 call, 1분 60 call 제한
 * 
 * 회사 관련 뉴스; 국내 주식 안됨, 미국/캐나다 주식만 가능
 * @example https://finnhub.io/api/v1/company-news?symbol={tsla}&from={2021-03-01}&to={2021-03-09}&token=
 * 뉴스; general, forex, crypto, merger
 * @example https://finnhub.io/api/v1/news?category={general}&token=

 */

const { BASE } = FinnhubConfigs;

const setUrl = (paths: string[]) => `${BASE}${paths.join('/')}`;
const setAxiosConfig = (params: object): AxiosRequestConfig => ({
  maxRedirects: 1,
  responseType: 'json',
  params: { ...params, token: FinnhubConfigs.ACCESS_KEY },
});

const marketUrl = `${BASE}news`;
const companyUrl = `${BASE}company-news`;

/**
 * 시장 전체에 대한 뉴스 리스트
 * @param category general (주식/지수) || crypto (코인)
 * @returns
 */
export const getMarketNews = async (category: marketEnum) => {
  const config = setAxiosConfig({ category });
  const { data, status, statusText } = await axios.get(marketUrl, config);

  if (status >= 400) throw Error(statusText);
  return data;
};

/**
 * 특정 기업 뉴스 리스트; 미국/캐나다 기업 한
 * @param symbol 종목 티커
 * @param from 이날부터; 기본값 2주전
 * @param to 이날까지; 기본값 오늘
 * @returns
 */
export const getCompanyNews = async (symbol: string, from: string, to: string) => {
  const config = setAxiosConfig({ symbol, from, to });

  const { data, status, statusText } = await axios.get(companyUrl, config);
  if (status >= 400) throw Error(statusText);
  return data;
};
