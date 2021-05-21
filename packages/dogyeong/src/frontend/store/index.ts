import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default () => {
  return new Vuex.Store({
    modules: {},

    state: {
      isDarkTheme: false,
      user: null,
    },

    getters: {},

    mutations: {
      changeTheme(state, isDark: boolean) {
        state.isDarkTheme = isDark;
      },
      setUser(state, user) {
        state.user = user;
      },
    },

    actions: {},
  });
};
