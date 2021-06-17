import { getNews, getArticleById } from '../../../../common/frontend/apis';
import { tickerMap } from '../../../../common/domain';

// 초기 state 값 설정
const state = () => ({
  news: [],
  articleDetail: {},

  newsIsLoading: false,
  newsIsError: false,
});

// getter 설정

const getters = {
  stockNews: (state) => {
    const stockNews = state.news.filter((element) => {
      const { tickers } = element;

      return tickers.some((ticker) => {
        return tickerMap.stock[ticker];
      });
    });

    return stockNews;
  },

  cryptoNews: (state) => {
    const cryptoNews = state.news.filter((element) => {
      const { tickers } = element;

      return tickers.some((ticker) => {
        return tickerMap.crypto[ticker];
      });
    });

    return cryptoNews;
  },
};

// actions 설정
const actions = {
  async getNews({ commit }) {
    try {
      const news = await getNews({});

      if (news) {
        commit('setNews', news);

        return true;
      }

      throw new Error('Getting news was failed in article store');
    } catch (error) {
      console.log(error);
      commit('setNewsIsError', true);
    }
  },

  async getArticleById({ commit }, id: string) {
    try {
      const article = await getArticleById(id);

      if (article) {
        commit('setArticleDetail', article);

        return true;
      }

      throw new Error('Getting article by id was failed in article store');
    } catch (error) {
      console.log(error);
    }
  },

  setNewsIsLoading({ commit }, isLoading) {
    commit('setNewsIsLoading', isLoading);
  },
};

// mutatuons 설정
const mutations = {
  setNews(state, news) {
    state.news = news;
  },
  setArticleDetail(state, article) {
    state.articleDetail = article;
  },

  setNewsIsLoading(state, isLoading) {
    state.newsIsLoading = isLoading;
  },

  setNewsIsError(state, isError) {
    state.newsIsError = isError;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
