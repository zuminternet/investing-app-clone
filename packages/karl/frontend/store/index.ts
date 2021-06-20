import Vue from 'vue';
import Vuex from 'vuex';
import market from './modules/market';
import user from './modules/user';
import article from './modules/article';
import itemDetail from './modules/itemDetail';
import search from '../../../common/frontend/store/modules/search';

// import itemDetail from '../../../common/frontend/store/modules/itemDetail';

Vue.use(Vuex);

export default () => {
  return new Vuex.Store({
    // logger

    // 각 기능 별 모듈
    modules: {
      market,
      user,
      search,
      itemDetail,
      article,
    },

    // 글로벌 영역 상태값.
    state: {
      isDarkTheme: true,
    },

    getters: {},

    mutations: {
      setIsDarkTheme(state, isDarkTheme) {
        state.isDarkTheme = isDarkTheme;
      },
    },

    actions: {
      setIsDarkTheme({ commit }, isDarkTheme) {
        commit('setIsDarkTheme', isDarkTheme);
      },
    },
  });
};
