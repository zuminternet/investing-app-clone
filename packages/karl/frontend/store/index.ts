import Vue from 'vue';
import Vuex from 'vuex';
import market from './modules/market';
import user from './modules/user';
import search from '../../../common/frontend/store/modules/search';

Vue.use(Vuex);

export default () => {
  return new Vuex.Store({
    // 각 기능 별 모듈
    modules: {
      market,
      user,
      search,
    },

    // 글로벌 영역 상태값.
    state: {},

    getters: {},

    mutations: {},

    actions: {},
  });
};
