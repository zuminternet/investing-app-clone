import { Module } from 'vuex';
import { RootState } from '@/store';

export interface ThemeState {
  isDark: boolean;
  curTheme: string;
}

export enum ThemeName {
  zum = '',
  dark = 'dark',
}

export const enum ThemeMapper {
  GET_THEME = 'GET_THEME',
  TOGGLE_THEME = 'TOGGLE_THEME',
}

/**
 *
 * vuex-module-decorators가 제대로 작동하지 않는 문제로 Vuex 원래 코드로 변경
 */

const Theme = {
  namespaced: true,

  state: {
    isDark: false,
    curTheme: ThemeName.zum,
  },

  getters: {
    [ThemeMapper.GET_THEME](state) {
      return state.curTheme;
    },
  },

  mutations: {
    toggleTheme(state) {
      state.isDark = !state.isDark;
      state.curTheme = state.isDark ? ThemeName.dark : ThemeName.zum;
    },
  },

  actions: {
    [ThemeMapper.TOGGLE_THEME]({ commit }) {
      commit('toggleTheme');
    },
  },
} as Module<ThemeState, RootState>;

export default Theme;
