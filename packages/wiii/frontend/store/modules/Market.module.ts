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
  stockData: any;
}

const aWeekBefore = getDateString(Date.now() - WEEK_ONE);

const Market = {
  namespaced: true,

  state: {
    stockTickers: [
      { typeName: `stock`, ticker: '005930', tickerName: '삼성전자', from: aWeekBefore },
      { typeName: `stock`, ticker: '017670', tickerName: 'SK Telecom', from: aWeekBefore },
      { typeName: `stock`, ticker: '035420', tickerName: 'Naver', from: aWeekBefore },
      { typeName: `stock`, ticker: '035720', tickerName: '카카오', from: aWeekBefore },
      { typeName: `stock`, ticker: '239340', tickerName: '줌인터넷', from: aWeekBefore },
    ],
    coinTickers: [
      // { typeName: `stock`, ticker: '239340', tickerName: '줌인터넷', from: aWeekBefore },
      // { typeName: `stock`, ticker: '005930', tickerName: '삼성전자', from: aWeekBefore },
      // { typeName: `stock`, ticker: '017670', tickerName: 'SK Telecom', from: aWeekBefore },
      // { typeName: `stock`, ticker: '035420', tickerName: 'Naver', from: aWeekBefore },
      // { typeName: `stock`, ticker: '035720', tickerName: '카카오', from: aWeekBefore },
    ],
    indexTickers: [],
    stockData: {},
  },

  getters: {
    hasStockData: (state) => Object.keys(state.stockData).length,
    getStocksTickers: (state) => state.stockTickers,
    getCoinsTickers: (state) => state.coinTickers,
  },

  mutations: {
    setStockData(state, { key, value }) {
      state.stockData[key] = value;
    },
  },

  actions: {
    getTodayStocks: async ({ state, commit }) => {
      try {
        const stocks = state.stockTickers.map(({ ticker }) => ticker).join(`-`);
        const { data, status, statusText } = await Axios.get(`/api/markets/stocks`, {
          params: { stocks },
        });
        console.log({ data, status, statusText });

        for (const d of data) {
          const key = Object.keys(d)[0];
          // state.stockData[key] = d['results'];
          console.log(d);
          commit('setStockData', { key, value: d });
        }

        if (status >= 400) throw Error(statusText);
        return data;
      } catch (e) {
        console.error(e);
      }
    },

    getTodayMiniStocks: async ({ state, commit }, ticker) => {
      if (ticker in state.stockData) return state.stockData[ticker];
      /** @todo service 함수로 분리 */
      try {
        const { data, status, statusText } = await Axios.get(`/api/markets/stocks`, {
          params: { stocks: ticker },
        });
        console.log({ data, status, statusText });

        for (const d of data) {
          /** @example data: { '005930' : { results: Array(10) }, count: 10, payload: { total : 10 } } */
          const key = Object.keys(d)[0];
          console.log({ key });
          console.log(d[key]);
          commit('setStockData', { key, value: d[key] });
        }

        if (status >= 400) throw Error(statusText);
        return state.stockData[ticker];
      } catch (e) {
        console.error(e);
      }
    },

    getTodayStockChange: ({ state }, ticker) => {
      if (ticker in state.stockData) return state.stockData[ticker].results.slice(0, 2);

      // console.log({ [ticker]: curData });
      return [];
    },

    /** @todo axios-polygon 서버로 옮겨야 */
    // getTodayCoins: async ({ state, commit }, { type }) => {
    //   try {
    //     const today = getDateString();
    //     const { data, status, statusText } = await Axios.get(
    //       `https://api.polygon.io/v2/aggs/grouped/locale/global/market/crypto/${today}`,
    //       {
    //         params: { apiKey: polygonAPIKey },
    //       },
    //     );
    //     console.log(data);
    //     if (status >= 400) throw Error(statusText);
    //     return data;
    //   } catch (e) {
    //     console.error(e);
    //     return [];
    //   }
    // },
  },
} as Module<MarketState, RootState>;

export default Market;
