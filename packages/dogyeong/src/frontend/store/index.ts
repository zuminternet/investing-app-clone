import Vue from 'vue';
import Vuex from 'vuex';
import createUserStore from '@/store/userStore';
import financeStore from '@/store/financeStore';
import articleStore from '@/store/articleStore';
import replyStore from 'common/frontend/store/modules/reply';
import searchStore from 'common/frontend/store/modules/search';

Vue.use(Vuex);

const createStore = () => {
  return new Vuex.Store({
    modules: {
      user: createUserStore(),
      finance: financeStore(),
      article: articleStore(),
      // reply: replyStore,
      search: searchStore,
    },

    state: {
      isDarkTheme: false,
    },

    mutations: {
      changeTheme(state, isDark: boolean) {
        state.isDarkTheme = isDark;
      },
    },
  });
};

export default createStore;

export const store = createStore();
