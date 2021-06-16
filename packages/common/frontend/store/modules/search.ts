import { getSearchedItems, getNews, getAnalyses } from '../../apis';

// 초기 state 값 설정
const state = () => ({
  searchedItems: [],
  searchedNews: [],
  searchedAnalyses: [],
});

// getter 설정

const getters = {};

// actions 설정
const actions = {
  async getSearchedItems({ commit }, { keyword, email }) {
    try {
      const items = await getSearchedItems({ keyword, email });

      if (items) {
        commit('setSearchedItems', items);

        return true;
      }

      throw new Error('Getting searched items was failed in search store');
    } catch (error) {
      console.log(error);
    }
  },

  async getSearchedNews({ commit }, { offset, limit, tickers }) {
    try {
      const news = await getNews({ offset, limit, tickers });

      if (news) {
        commit('setSearchedNews', news);

        return true;
      }

      throw new Error('Getting news was failed in itemDetail store');
    } catch (error) {
      console.log(error);
    }
  },

  async getSearchedAnalyses({ commit }, { offset, limit, tickers }) {
    try {
      const analyses = await getAnalyses({ offset, limit, tickers });

      if (analyses) {
        commit('setSearchedAnalyses', analyses);

        return true;
      }

      throw new Error('Getting news was failed in itemDetail store');
    } catch (error) {
      console.log(error);
    }
  },

  clearSearchStore({ commit }) {
    commit('clearSearchStore');
  },
};

// mutatuons 설정
const mutations = {
  setSearchedItems(state, items) {
    state.searchedItems = items.map((item) => {
      return { ...item, category: item.stock_exchange.acronym };
    });
  },

  setSearchedNews(state, news) {
    state.searchedNews = news;
  },

  setSearchedAnalyses(state, analyses) {
    state.searchedAnalyses = analyses;
  },

  clearSearchStore(state) {
    state.searchedItems = [];
    state.searchedNews = [];
    state.searchedAnalyses = [];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
