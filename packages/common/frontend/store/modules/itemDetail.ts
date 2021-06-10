import { getAnalyses, getItemDetail, getNews } from '../../apis';

// 초기 state 값 설정
const state = () => ({
  itemDetail: {
    name: '', // 이름
    symbol: '',
    category: '', // 소속
    adjClose: '', // 이전 종가
    adjLow: '', // 이전 최저가
    adjHigh: '', // 이전 최고가
    close: '', // 종가
    open: '', // 시가
    volume: '', //  거래량
    acronym: '', //
    high: '', // 최고가
    low: '', // 최저가
    upDownPrice: '',
    upDownRate: '',
    time: '100',
    currency: 'dallor',
  },
  news: [],
  analyses: [],
});

// getter 설정

const getters = {};

// actions 설정
const actions = {
  async getItemDetail({ commit }, { symbols, email, name }) {
    try {
      const itemDetail = await getItemDetail({ symbols, email });

      console.log(itemDetail);

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
};

// mutatuons 설정
const mutations = {
  setItemDetail(state, { itemDetail, name }) {
    const {
      symbol,
      adj_close,
      adj_high,
      adj_low,
      close,
      open,
      volume,
      stock_exchange,
      high,
      low,
      isBookmarked,
      isStock,
    } = itemDetail;

    state.itemDetail = {
      ...state.itemDetail,
      name,
      symbol,
      category: stock_exchange.acronym,
      adjClose: adj_close,
      adjHigh: adj_high,
      adjLow: adj_low,
      close,
      open,
      volume,
      acronym: stock_exchange.acronym,
      high,
      low,
      isBookmarked,
      isStock,
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
