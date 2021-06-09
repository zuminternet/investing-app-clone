// import { getIndices, getStocks, getCryptos } from '../../apis';

// 초기 state 값 설정
const state = () => ({
  news: [],
});

// getter 설정

const getters = {
  // itemCollections: (state) => {
  //   return [state.indicesItems, state.stockItems, state.cryptoItems];
  // },
};

// actions 설정
const actions = {
  // async getStocks({ commit }) {
  //   try {
  //     const stocks = await getStocks();
  //     if (stocks) {
  //       commit('setStockItems', stocks);
  //       return true;
  //     }
  //     throw new Error('Getting stocks was failed in market store');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
};

// mutatuons 설정
const mutations = {
  // setStockItems(state, stocks) {
  //   state.stockItems = stocks;
  // },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
