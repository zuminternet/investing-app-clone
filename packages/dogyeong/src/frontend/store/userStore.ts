import * as authService from '@/services/authService';
import { googleAuthOptions } from '@/config';

/**
 * userStore
 *
 * 유저 정보, 인증로직을 관리하는 스토어 모듈
 */
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

    getters: {
      isLoggedIn(state) {
        return state.user !== null;
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
          throw e;
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
