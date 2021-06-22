import { getSearchedItems, getNews, getAnalyses } from '../../apis';

// 초기 state 값 설정
const state = () => ({
  searchedItems: [],
  searchedNews: [],
  searchedAnalyses: [],

  searchedItemsIsLoading: false,
  searchedItemIsError: false,
  searchedNewsIsLoading: false,
  searchedNewsIsError: false,
  searchedAnalysesIsLoading: false,
  searchedAnalysesIsError: false,
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
      commit('setSearchedItemIsError', true);
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
      commit('setSearchedNewsIsError', true);
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
      commit('setSearchedAnalysesIsError', true);
    }
  },

  setSearchedItemsIsLoading({ commit }, isLoading) {
    commit('setSearchedItemsIsLoading', isLoading);
  },

  setSearchedNewsIsLoading({ commit }, isLoading) {
    commit('setSearchedNewsIsLoading', isLoading);
  },

  setSearchedAnalysesIsLoading({ commit }, isLoading) {
    commit('setSearchedAnalysesIsLoading', isLoading);
  },

  clearSearchStore({ commit }) {
    commit('clearSearchStore');
  },
};

// mutatuons 설정
const mutations = {
  setSearchedItems(state, items) {
    state.searchedItems = items;
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

  setSearchedItemsIsLoading(state, isLoading) {
    state.searchedItemsIsLoading = isLoading;
  },

  setSearchedItemIsError(state, isError) {
    state.searchedItemIsError = isError;
  },

  setSearchedNewsIsLoading(state, isLoading) {
    state.searchedNewsIsLoading = isLoading;
  },

  setSearchedNewsIsError(state, isError) {
    state.searchedNewsIsError = isError;
  },

  setSearchedAnalysesIsLoading(state, isLoading) {
    state.searchedAnalysesIsLoading = isLoading;
  },

  setSearchedAnalysesIsError(state, isError) {
    state.searchedAnalysesIsError = isError;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
