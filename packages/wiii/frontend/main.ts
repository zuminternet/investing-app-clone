import Vue from 'vue';
import { initializer } from 'zum-portal-core/frontend';
import App from '@/App.vue';
import createRouter from '@/router';
import createStore from '@/store';

initializer(() => {
  Vue.prototype._$router = createRouter();
  /** vue-module-decorators에서 new Store()로만 생성하게 되어있음.. */
  Vue.prototype._$store = createStore;

  return new Vue({
    el: '#app',
    router: Vue.prototype._$router,
    store: Vue.prototype._$store,
    render: (h) => h(App),
  });
});
