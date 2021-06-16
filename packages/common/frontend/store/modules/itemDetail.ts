import { getAnalyses, getItemDetail, getNews } from '../../apis';

// 초기 state 값 설정
const state = () => ({
  itemDetail: {},
  news: [],
  analyses: [],

  itemDetailIsLoading: false,
  itemDetailIsError: false,

  newsIsLoading: false,
  newsIsError: false,

  analysesIsLoading: false,
  analysesIsError: false,
});

// getter 설정

const getters = {};

// actions 설정
const actions = {
  async getItemDetail({ commit }, { symbols, email, name }) {
    try {
      const itemDetail = await getItemDetail({ symbols, email });

      if (itemDetail) {
        commit('setItemDetail', { itemDetail, name });

        return true;
      }

      throw new Error('Getting item detail was failed in itemDetail store');
    } catch (error) {
      console.log(error);
    }
  },

  async getNews({ commit }, { offset, limit, tickers }) {
    try {
      const news = await getNews({ offset, limit, tickers });

      if (news) {
        commit('setNews', news);

        return true;
      }

      throw new Error('Getting news was failed in itemDetail store');
    } catch (error) {
      console.log(error);
    }
  },

  async getAnalyses({ commit }, { offset, limit, tickers }) {
    try {
      const analyses = await getAnalyses({ offset, limit, tickers });

      if (analyses) {
        commit('setAnalyses', analyses);

        return true;
      }

      throw new Error('Getting analyses was failed in itemDetail store');
    } catch (error) {
      console.log(error);
    }
  },

  clearItemDetail({ commit }) {
    commit('clearItemDetail');
  },

  setItemDetailIsLoading({ commit }, isLoading) {
    commit('setItemDetailIsLoading', isLoading);
  },

  setItemDetailIsError({ commit }, isError) {
    commit('setItemDetailIsError', isError);
  },

  setNewsIsLoading({ commit }, isLoading) {
    commit('setNewsIsLoading', isLoading);
  },

  setNewsIsError({ commit }, isError) {
    commit('setNewsIsError', isError);
  },

  setAnalysesIsLoading({ commit }, isLoading) {
    commit('setAnalysesIsLoading', isLoading);
  },

  setAnalysesIsError({ commit }, isError) {
    commit('setAnalysesIsError', isError);
  },
};

// mutatuons 설정
const mutations = {
  setItemDetail(state, { itemDetail, name }) {
    const { adj_close, adj_high, adj_low, close, stock_exchange } = itemDetail;

    state.itemDetail = {
      ...itemDetail,
      name,
      category: stock_exchange.acronym,
      adjClose: adj_close,
      adjHigh: adj_high,
      adjLow: adj_low,
      acronym: stock_exchange.acronym,
      upDownPrice: close - adj_close,
      upDownRate: ((close - adj_close) / close) * 100,
    };
  },

  setNews(state, news) {
    state.news = news;
  },

  setAnalyses(state, analyses) {
    state.analyses = analyses;
  },

  clearItemDetail(state) {
    state.itemDetail = {};
  },

  setItemDetailIsLoading(state, isLoading) {
    state.itemDetailIsLoading = isLoading;
  },

  setItemDetailIsError(state, isError) {
    state.itemDetailIsError = isError;
  },

  setNewsIsLoading(state, isLoading) {
    state.newsIsLoading = isLoading;
  },

  setNewsIsError(state, isError) {
    state.newsIsError = isError;
  },

  setAnalysesIsLoading(state, isLoading) {
    state.analysesIsLoading = isLoading;
  },

  setAnalysesIsError(state, isError) {
    state.analysesIsError = isError;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
