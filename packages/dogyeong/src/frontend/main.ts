import Vue from 'vue';
import 'zum-portal-core/frontend';
import App from '@/App.vue';
import createRouter from '@/router';
import createStore from '@/store';
import 'swiper/swiper-bundle.css';

Vue.prototype._$router = createRouter();
Vue.prototype._$store = createStore();

const $app = new Vue({
  el: '#app',
  router: Vue.prototype._$router,
  store: Vue.prototype._$store,
  render: (h) => h(App),
});
