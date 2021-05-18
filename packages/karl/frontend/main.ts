import Vue from 'vue';
import Router from 'vue-router';
import 'zum-portal-core/frontend';
import App from './App.vue';
import createRouter from './router';
import createStore from './store';

Vue.use(Router);
const router = createRouter();
const store = createStore();

const $app = new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
});
