import * as authService from '@/services/authService';
import { googleAuthOptions } from '@/config';

export default () => {
  return {
    state: {
      user: null,
    },

    mutations: {
      setUser(state, user) {
        state.user = user;
      },
    },

    actions: {
      async login({ commit }, { email, password }) {
        try {
          const { user } = await authService.login({ email, password });
          commit('setUser', user);
        } catch (e) {
          console.error(e);
          throw e;
        }
      },

      async googleLogin({ commit }) {
        try {
          const { gapi } = window;
          const { code } = await gapi.auth2.getAuthInstance().grantOfflineAccess(googleAuthOptions);
          const { user } = await authService.googleLogin(code);
          commit('setUser', user);
        } catch (e) {
          console.error(e);
          throw e;
        }
      },

      async fetchCurrentUser({ commit }) {
        try {
          const { user } = await authService.fetchUser();
          commit('setUser', user);
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
  };
};
