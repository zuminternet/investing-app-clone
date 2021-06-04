import { getSearchedItems } from '../../apis';

// 초기 state 값 설정
const state = () => ({
  searchedItems: [],

  searchedNews: [],
  searchedAnalysis: [],
});

// getter 설정

const getters = {
  // itemCollections: (state) => {
  //   return [state.stockItems, state.indexItems, state.cryptoItems];
  // },
};

// actions 설정
const actions = {
  async getSearchedItems({ commit }, keyword) {
    try {
      const result = await getSearchedItems({ keyword });
      const { data: items } = result;

      if (items) {
        commit('changeSearchedItems', items);

        return true;
      }

      throw new Error('Getting searched items was failed in search store');
    } catch (error) {
      console.log(error);
    }
  },
};

// mutatuons 설정
const mutations = {
  changeSearchedItems(state, items) {
    state.searchedItems = items;

    console.log(state);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
