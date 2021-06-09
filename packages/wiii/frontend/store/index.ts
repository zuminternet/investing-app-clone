import Vue from 'vue';
import Vuex, { Store } from 'vuex';

import Theme from '@/store/modules/theme';
import Reply from '@/store/modules/reply';
import { RootActions } from '@/store/types';
export * from '@/store/types';

Vue.use(Vuex);

const store = new Store({
  state: {
    ticker: undefined,
  },

  getters: {
    getTicker: (state) => state.ticker,
  },

  mutations: {
    [RootActions.SET_CURRENT_TICKER]: (state, ticker: string) => {
      state.ticker = ticker;
    },
  },

  actions: {
    [RootActions.SET_CURRENT_TICKER]: ({ commit }, ticker: string) => {
      commit(RootActions.SET_CURRENT_TICKER, ticker);
    },
  },

  modules: {
    Theme,
    Reply,
  },
});

export default store;
