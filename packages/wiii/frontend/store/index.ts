import Vue from 'vue';
import Vuex from 'vuex';

import Theme, { ThemeState } from '@/store/modules/theme';
import { RouteState } from '@/store/modules/route';
import { getModule } from 'vuex-module-decorators';

export interface RootState {
  Theme: ThemeState;
  Route: RouteState;
}

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    theme: Theme,
  },
});

export const ThemeModule = getModule(Theme, store);

export default store;
