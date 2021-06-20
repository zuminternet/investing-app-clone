import { AxiosStatic } from 'axios';
import { marketEnum } from '../../../domain/newsData';

declare const Axios: AxiosStatic;

const newsUrl = `/api/news`;

/**
 * 뉴스 리스트 API 요청
 * /api/news/market/{general} -> News.controller
 * @param category marketEnum, general || crypto
 * @returns data array;
 * @see wiii/backend/service/news/dummy_market_general
 */
export const getMarketNews = async (category: marketEnum = marketEnum.general) => {
  const { data, status, statusText } = await Axios.get(`${newsUrl}/market/${category}`);
  console.log({ data, status, statusText });
  if (status >= 400) throw Error(statusText);
  return data;
};

export const getCompanyNews = async (symbol, from?: string, to?: string) => {
  const { data, status, statusText } = await Axios.get(`${newsUrl}/company/${symbol}`, { params: { from, to } });
  if (status >= 400) throw Error(statusText);
  return data;
};
