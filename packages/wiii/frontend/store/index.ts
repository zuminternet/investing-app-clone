import Vue from 'vue';
import Vuex, { Store } from 'vuex';

import Theme from '@/store/modules/theme';
import Reply from '@/store/modules/reply';
export * from '@/store/types';

Vue.use(Vuex);

const store = new Store({
  modules: {
    Theme,
    Reply,
  },
});

export default store;
