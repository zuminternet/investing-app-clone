import Vue from 'vue';
import Vuex from 'vuex';
import createUserStore from '@/store/userStore';
import financeStore from '@/store/financeStore';
import articleStore from '@/store/articleStore';

Vue.use(Vuex);

export default () => {
  return new Vuex.Store({
    modules: {
      user: createUserStore(),
      finance: financeStore(),
      article: articleStore(),
    },

    state: {
      isDarkTheme: false,
    },

    getters: {},

    mutations: {
      changeTheme(state, isDark: boolean) {
        state.isDarkTheme = isDark;
      },
    },

    actions: {},
  });
};
