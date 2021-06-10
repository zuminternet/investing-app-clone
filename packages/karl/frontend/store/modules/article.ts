import { getNews, getAnalyses } from '../../../../common/frontend/apis';

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
