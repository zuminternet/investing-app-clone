import Vue from 'vue';
import Vuex from 'vuex';

import { views } from '@/type/views';
import { actionTypes } from '@/store/types';
import chart from '@/store/modules/chart';

Vue.use(Vuex);

export default () =>
  new Vuex.Store({
    state: {
      currentView: views.Home,
    },
    mutations: {
      setCurrentView(state, selectedView) {
        state.currentView = selectedView;
      },
    },
    actions: {
      setCurrentView(context, selectedView) {
        return context.commit(actionTypes.setCurrentView, selectedView);
      },
    },
    modules: {
      chart,
    },
  });
