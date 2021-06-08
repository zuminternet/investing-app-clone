import Vue from 'vue';
import Vuex from 'vuex';

import Theme, { ThemeState } from '@/store/modules/theme';
import Reply from '@/store/modules/reply';
import { RouteState } from '@/store/modules/route';
import { getModule } from 'vuex-module-decorators';

export interface RootState {
  Theme: ThemeState;
  Route: RouteState;
}

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Theme,
    Reply,
  },
});

export const ThemeModule = getModule(Theme, store);

export default store;
