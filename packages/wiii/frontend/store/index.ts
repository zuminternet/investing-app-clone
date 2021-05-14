import Vue from 'vue';
import Vuex from 'vuex';
import { views } from '@/types';

Vue.use(Vuex);

export default () =>
  new Vuex.Store({
    state: {
      currentView: views.Home,
    },
    mutations: {
      setCurrentView(state, selectedView) {
        this.currentView = selectedView;
      },
    },
    actions: {},
    modules: {},
  });
