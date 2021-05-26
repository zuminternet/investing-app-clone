import Vue from 'vue';
import Vuex from 'vuex';
import market from './modules/market';
Vue.use(Vuex);

export default () => {
  return new Vuex.Store({
    // 각 기능 별 모듈
    modules: {
      market,
    },

    // 글로벌 영역 상태값.
    state: {},

    getters: {},

    mutations: {},

    actions: {},
  });
};
