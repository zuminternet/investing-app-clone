import { Module } from 'vuex';
import { AxiosStatic } from 'axios';
import { RootState } from '@/store';
import { getDateString, times, WEEK_ONE } from '../../../domain/date';
import { polygonAPIKey } from '@/config';

declare const Axios: AxiosStatic;

interface MarketState {
  stockTickers: Array<any>;
  indexTickers: Array<any>;
  coinTickers: Array<any>;
}

const aWeekBefore = getDateString(Date.now() - WEEK_ONE);

const Market = {
  namespaced: true,

  state: {
    stockTickers: [
      { typeName: `stock`, ticker: '239340', tickerName: '줌인터넷', from: aWeekBefore },
      { typeName: `stock`, ticker: '005930', tickerName: '삼성전자', from: aWeekBefore },
      // { typeName: `stock`, ticker: '017670', tickerName: 'SK Telecom', from: aWeekBefore },
      // { typeName: `stock`, ticker: '035420', tickerName: 'Naver', from: aWeekBefore },
      // { typeName: `stock`, ticker: '035720', tickerName: '카카오', from: aWeekBefore },
    ],
    coinTickers: [
      // { typeName: `stock`, ticker: '239340', tickerName: '줌인터넷', from: aWeekBefore },
      // { typeName: `stock`, ticker: '005930', tickerName: '삼성전자', from: aWeekBefore },
      // { typeName: `stock`, ticker: '017670', tickerName: 'SK Telecom', from: aWeekBefore },
      // { typeName: `stock`, ticker: '035420', tickerName: 'Naver', from: aWeekBefore },
      // { typeName: `stock`, ticker: '035720', tickerName: '카카오', from: aWeekBefore },
    ],
    indexTickers: [],
  },

  getters: {
    getStocksTickers: (state) => state.stockTickers,
    getCoinsTickers: (state) => state.coinTickers,
  },

  actions: {
    getTodayCoins: async ({ state, commit }, { type }) => {
      try {
        const today = getDateString();
        const { data, status, statusText } = await Axios.get(
          `https://api.polygon.io/v2/aggs/grouped/locale/global/market/crypto/${today}`,
          {
            params: { apiKey: polygonAPIKey },
          },
        );
        console.log({ data });
        if (status >= 400) throw Error(statusText);
        return data;
      } catch (e) {
        console.error(e);
        return [];
      }
    },
  },
} as Module<MarketState, RootState>;

export default Market;
