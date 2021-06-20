import { AxiosStatic } from 'axios';

declare const Axios: AxiosStatic;

export const getAllStocks = async () => {
  const { data, status, statusText } = await Axios.get(`/api/markets/stocks/all`);
  if (status >= 400) throw Error(statusText);
  return data;
};

/** @todo deprecated 될 수 있음 */
export const getStocksByTicker = async (tickers: string) => {
  const { data, status, statusText } = await Axios.get(`/api/markets/stocks`, {
    params: { stocks: tickers },
  });
  if (status >= 400) throw Error(statusText);

  const _data = [];

  for (const d of data) {
    /** @example data: { '005930' : { results: Array(10) }, count: 10, payload: { total : 10 } } */
    const ticker = Object.keys(d)[0];
    const value = d[ticker];
    const {
      results: [last, prev],
    } = value;
    const price = last['adj_close'];
    const prevPrice = prev['adj_close'];
    const change = (price - prevPrice) / prevPrice;
    _data.push({ ticker, price, change, ...value });
  }

  /** 등락율 순 정렬 기본으로 */
  return _data.sort((a, b) => b.change - a.change);
};
