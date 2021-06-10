import Vue from 'vue';
import Vuex, { Store } from 'vuex';

import Theme from '@/store/modules/Theme.module';
import Auth from '@/store/modules/Auth.module';
import Reply from '@/store/modules/Reply.module';
import { RootActions } from '@/store/types';
export * from '@/store/types';

Vue.use(Vuex);

const store = new Store({
  state: {
    ticker: undefined,
    auth: false,
    email: undefined,
  },

  getters: {
    getTicker: ({ ticker }) => ticker,
    getAuth: ({ auth }) => auth,
    getEmail: ({ email }) => email,
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
    Auth,
    Reply,
  },
});

export default store;
