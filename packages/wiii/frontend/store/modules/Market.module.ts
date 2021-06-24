import { Module } from 'vuex';
import { AxiosStatic } from 'axios';
import { RootState } from '@/store';
import { getStocksByTicker, getAllStocks } from '../../services/market/stocks';

declare const Axios: AxiosStatic;

interface MarketState {
  stockOverviews: any;
  stockData: any;
  sortedStockData: Array<any>;
  coinOverviews: any;
  coinData: any;
  sortedCoinData: Array<any>;
  indexOverviews: any;
  indexData: any;
  sortedIndexData: Array<any>;
}

const Market = {
  namespaced: true,

  state: {
    stockOverviews: {},
    stockData: {},
    sortedStockData: [],
    indexOverviews: {},
    indexData: {},
    sortedIndexData: [],
    coinOverviews: {},
    coinData: {},
    sortedCoinData: [],
  },

  getters: {
    hasStockData: (state) => Object.keys(state.stockData).length,
  },

  mutations: {
    setStockOverviews(state, { key, value }) {
      state.stockOverviews[key] = value;
    },

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
        commit('setSortedStockData', data.hist);

        const { hist, overview } = data;
        for (const hs of hist) {
          const ticker = hs.ticker;
          if (!ticker) continue;
          commit('setStockData', { key: ticker, value: hs });
        }

        const ovTickers = Object.keys(overview);
        for (const ticker of ovTickers) {
          commit('setStockOverviews', { key: ticker, value: overview[ticker] });
        }
      } catch (e) {
        console.error(e);
      }
    },

    getTodayMiniStocks: async ({ state, commit }, ticker) => {
      if (ticker in state.stockData) return state.stockData[ticker];
      console.warn(`[Market:Module:getTodayMiniStocks] getting uncached ticker data : ${ticker}`);

      try {
        const _data = await getStocksByTicker(ticker);
        commit('setStockData', { key: ticker, value: _data });
        return state.stockData[ticker];
      } catch (e) {
        console.error(e);
      }
    },
  },
} as Module<MarketState, RootState>;

export default Market;
