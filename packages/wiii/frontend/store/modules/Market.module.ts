import { Module } from 'vuex';
import { AxiosStatic } from 'axios';
import { RootState } from '@/store';
import { getStocksByTicker, getAllStocks } from '../../services/market/stocks';

declare const Axios: AxiosStatic;

interface MarketState {
  stockData: any;
  sortedStockData: Array<any>;
  coinData: any;
  sortedCoinData: Array<any>;
  indexData: any;
  sortedIndexData: Array<any>;
}

const Market = {
  namespaced: true,

  state: {
    stockData: {},
    sortedStockData: [],
    indexData: {},
    sortedIndexData: [],
    coinData: {},
    sortedCoinData: [],
  },

  getters: {
    hasStockData: (state) => Object.keys(state.stockData).length,
  },

  mutations: {
    setStockData(state, { key, value }) {
      state.stockData[key] = value;
    },

    setSortedStockData(state, payload) {
      state.sortedStockData = payload;
    },
  },

  actions: {
    getAllStocks: async ({ commit }) => {
      try {
        const data = await getAllStocks();
        commit('setSortedStockData', data);

        for (const da of data) {
          console.log(da.ticker);
          if (!da.ticker) continue;
          commit('setStockData', { key: da.ticker, value: da });
        }
      } catch (e) {
        console.error(e);
      }
    },

    /** @todo 함수 변경 */
    getTodayMiniStocks: async ({ state, commit }, ticker) => {
      if (ticker in state.stockData) return state.stockData[ticker];
      /** @todo service 함수로 분리, 위 getTodayStocks와 동일 로직임 */
      try {
        const _data = await getStocksByTicker(ticker);
        commit('setStockData', { key: ticker, value: _data });

        const beforeData = state.sortedStockData;
        commit(
          'setSortedStockData',
          [...beforeData, _data].sort(({ change: a }, { change: b }) => b - a),
        );

        return state.stockData[ticker];
      } catch (e) {
        console.error(e);
      }
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
