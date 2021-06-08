import { Module, ActionContext } from 'vuex';
import { RootState } from '@/store';

export interface RouteState {
  currentView: string;
}

const RouteModule: Module<RouteState, RootState> = {
  namespaced: true,
  state() {
    return {
      /** @todo */
      currentView: 'Home',
    };
  },
};

export default RouteModule;
