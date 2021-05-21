import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

const GOOGLE_AUTH_OPTIONS = {
  prompt: 'select_account',
};

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
          } = await Axios.post('/api/auth', { email, password });
          console.log(user);
          commit('setUser', user.name);
        } catch (e) {
          console.error(e);
        }
      },
      async googleLogin({ commit }) {
        try {
          const gapi = (window as any).gapi;
          const { code } = await gapi.auth2.getAuthInstance().grantOfflineAccess(GOOGLE_AUTH_OPTIONS);

          const {
            data: { user },
          } = await Axios.get('/api/auth/google', { headers: { inv_google_auth: code } });
          console.log(user);
          commit('setUser', user.name);
        } catch (e) {
          console.error(e);
        }
      },
      async fetchCurrentUser({ commit }) {
        try {
          const {
            data: { user },
          } = await Axios.get('/api/user');

          commit('setUser', user.name);
        } catch (e) {
          commit('setUser', null);
        }
      },
      async logout({ commit }) {
        try {
          await Axios.get('/api/logout');
          commit('setUser', null);
        } catch (e) {
          console.error(e);
        }
      },
    },
  });
};
