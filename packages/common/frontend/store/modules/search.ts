import { getSearchedItems } from '../../apis';

// 초기 state 값 설정
const state = () => ({
  searchedItems: [],

  searchedNews: [],
  searchedAnalysis: [],
});

// getter 설정

const getters = {};

// actions 설정
const actions = {
  async getSearchedItems({ commit }, { keyword, email }) {
    try {
      const items = await getSearchedItems({ keyword, email });

      if (items) {
        commit('changeSearchedItems', items);

        return true;
      }

      throw new Error('Getting searched items was failed in search store');
    } catch (error) {
      console.log(error);
    }
  },

  async clearSearchStore({ commit }) {
    commit('clearSearchStore');
  },
};

// mutatuons 설정
const mutations = {
  changeSearchedItems(state, items) {
    state.searchedItems = items;
  },

  clearSearchStore(state) {
    state.searchedItems = [];
    state.searchedNews = [];
    state.searchedAnalysis = [];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
