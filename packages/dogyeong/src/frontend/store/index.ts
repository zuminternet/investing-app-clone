import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import { apiEndpoints, googleAuthOptions } from '@/config';

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
          const {
            data: { user },
          } = await Axios.post(apiEndpoints.login, { email, password });
          console.log(user);
          commit('setUser', user.name);
        } catch (e) {
          console.error(e);
        }
      },
      async googleLogin({ commit }) {
        try {
          const gapi = window.gapi;
          const { code } = await gapi.auth2.getAuthInstance().grantOfflineAccess(googleAuthOptions);
          const {
            data: { user },
          } = await Axios.get(apiEndpoints.googleLogin, { headers: { inv_google_auth: code } });

          commit('setUser', user.name);
        } catch (e) {
          console.error(e);
        }
      },
      async fetchCurrentUser({ commit }) {
        try {
          const {
            data: { user },
          } = await Axios.get(apiEndpoints.fetchUser);

          commit('setUser', user.name);
        } catch (e) {
          commit('setUser', null);
        }
      },
      async logout({ commit }) {
        try {
          await Axios.get(apiEndpoints.logout);
          commit('setUser', null);
        } catch (e) {
          console.error(e);
        }
      },
    },
  });
};
