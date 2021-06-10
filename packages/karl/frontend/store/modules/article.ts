import { getNews, getAnalyses } from '../../../../common/frontend/apis';
import { tickerMap } from '../../../../common/domain';

// 초기 state 값 설정
const state = () => ({
  news: [],
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

      console.log(news);

      if (news) {
        commit('setNews', news);

        return true;
      }

      throw new Error('Getting news was failed in article store');
    } catch (error) {
      console.log(error);
    }
  },
};

// mutatuons 설정
const mutations = {
  setNews(state, news) {
    state.news = news;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
