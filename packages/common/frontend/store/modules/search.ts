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

  setSearchedItemsIsLoading({ commit }, isLoading) {
    commit('setSearchedItemsIsLoading', isLoading);
  },

  setSearchedItemIsError({ commit }, isError) {
    commit('setSearchedItemIsError', isError);
  },

  setSearchedNewsIsLoading({ commit }, isLoading) {
    commit('setSearchedNewsIsLoading', isLoading);
  },

  setSearchedNewsIsError({ commit }, isError) {
    commit('setSearchedNewsIsError', isError);
  },

  setSearchedAnalysesIsLoading({ commit }, isLoading) {
    commit('setSearchedAnalysesIsLoading', isLoading);
  },

  setSearchedAnalysesIsError({ commmit }, isError) {
    commmit('setSearchedAnalysesIsError', isError);
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
