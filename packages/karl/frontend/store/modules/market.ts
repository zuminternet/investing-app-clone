import { getIndices, getStocks, getCryptos } from '../../apis';

// 초기 state 값 설정
const state = () => ({
  indicesItems: [],
  stockItems: [],
  cryptoItems: [],

  indicesIsLoading: false,
  indicesIsError: false,
  stocksIsLoading: false,
  stocksIsError: false,
  cryptosIsLoading: false,
  cryptosIsError: false,
});

// getter 설정

const getters = {};

// actions 설정
const actions = {
  async getStocks({ commit }) {
    try {
      const stocks = await getStocks();

      if (stocks) {
        commit('setStockItems', stocks);

        return true;
      }

      throw new Error('Getting stocks was failed in market store');
    } catch (error) {
      console.log(error);
      commit('setStocksIsError', true);
    }
  },

  async getIndices({ commit }) {
    try {
      const indices = await getIndices();

      if (indices) {
        commit('setIndicesItems', indices);

        return true;
      }

      throw new Error('Getting indices was failed in market store');
    } catch (error) {
      console.log(error);
      commit('setIndicesIsError', true);
    }
  },

  async getCryptos({ commit }) {
    try {
      const crpytos = await getCryptos();

      if (crpytos) {
        commit('setCryptoItems', crpytos);

        return true;
      }

      throw new Error('Getting crpytos was failed in market store');
    } catch (error) {
      console.log(error);
      commit('setCryptosIsError', true);
    }
  },

  setIndicesIsLoading({ commit }, isLoading) {
    commit('setIndicesIsLoading', isLoading);
  },

  setStocksIsLoading({ commit }, isLoading) {
    commit('setStocksIsLoading', isLoading);
  },

  setCryptosIsLoading({ commit }, isLoading) {
    commit('setCryptosIsLoading', isLoading);
  },
};

// mutatuons 설정
const mutations = {
  setStockItems(state, stocks) {
    state.stockItems = stocks;
  },

  setIndicesItems(state, indices) {
    state.indicesItems = indices;
  },

  setCryptoItems(state, cryptos) {
    state.cryptoItems = cryptos;
  },

  setIsLoading(state, isLoading) {
    state.isLoading = isLoading;
  },

  setIsError(state, isError) {
    state.isError = isError;
  },

  setIndicesIsLoading(state, isLoading) {
    state.indicesIsLoading = isLoading;
  },

  setIndicesIsError(state, isError) {
    state.indicesIsError = isError;
  },

  setStocksIsLoading(state, isLoading) {
    state.stocksIsLoading = isLoading;
  },

  setStocksIsError(state, isError) {
    state.stocksIsError = isError;
  },

  setCryptosIsLoading(state, isLoading) {
    state.cryptosIsLoading = isLoading;
  },

  setCryptosIsError(state, isError) {
    state.cryptosIsError = isError;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
