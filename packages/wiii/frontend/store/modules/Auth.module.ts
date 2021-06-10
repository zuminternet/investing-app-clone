import { Module } from 'vuex';
import { RootState } from '../types';
import { login, logout, signup } from '@/services/user';

interface AuthState {}

const AuthStore = {
  namespaced: true,

  state: {
    //
  },

  getters: {
    //
  },

  mutations: {
    //
  },

  actions: {
    postLogin: async ({ rootState }, { email, password }) => {
      try {
        const result = await login(email, password);
        if (!result) throw Error();
        rootState.auth = true;
        rootState.email = email;
        return true;
      } catch (e) {
        return console.error(e);
      }
    },

    getLogout: ({ state, commit }, { email }) => {
      /** @todo */
    },

    postSignUp: async ({ state, commit }, { email, password, nickname }) => {
      try {
        const result = await signup(email, password, nickname);
        if (!result) throw Error();
        return true;
      } catch (e) {
        return console.error(e);
      }
    },
  },
} as Module<AuthState, RootState>;

export default AuthStore;
