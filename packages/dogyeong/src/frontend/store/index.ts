import Vue from 'vue';
import Vuex from 'vuex';
import { googleAuthOptions } from '@/config';
import * as authService from '@/services/authService';

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

    actions: {
      async login({ commit }, { email, password }) {
        try {
          const { user } = await authService.login({ email, password });
          commit('setUser', user.name);
        } catch (e) {
          console.error(e);
        }
      },
      async googleLogin({ commit }) {
        try {
          const { gapi } = window;
          const { code } = await gapi.auth2.getAuthInstance().grantOfflineAccess(googleAuthOptions);
          const { user } = await authService.googleLogin(code);
          commit('setUser', user.name);
        } catch (e) {
          console.error(e);
        }
      },
      async fetchCurrentUser({ commit }) {
        try {
          const { user } = await authService.fetchUser();
          commit('setUser', user.name);
        } catch (e) {
          commit('setUser', null);
        }
      },
      async logout({ commit }) {
        try {
          await authService.logout();
          commit('setUser', null);
        } catch (e) {
          console.error(e);
        }
      },
    },
  });
};
