import { getIndices, getStocks, getCryptos } from '../../apis';

// 초기 state 값 설정
const state = () => ({
  indicesItems: [],
  stockItems: [],
  cryptoItems: [],
  isLoading: false,
  isError: false,
});

// getter 설정

const getters = {
  itemCollections: (state) => {
    return [state.indicesItems, state.stockItems, state.cryptoItems];
  },
};

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
      commit('setIsError', true);
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
      commit('setIsError', true);
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
      commit('setIsError', true);
    }
  },

  setIsLoading({ commit }, isLoading) {
    commit('setIsLoading', isLoading);
  },

  setIsError({ commit }, isError) {
    commit('setIsError', isError);
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
