import Vue from 'vue';
import Router from 'vue-router';
import Vuex from 'vuex';
import App from '@/App.vue';
import createRouter from '@/router';
import createStore from '@/store';
import '@/styles/index.scss';
import 'swiper/swiper-bundle.css';

Vue.use(Router);
Vue.use(Vuex);

export default (ctx) => {
  return new Promise((resolve, reject) => {
    const store = createStore();
    const router = createRouter();

    router.replace(ctx.path || '/');
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }

      const app = new Vue({
        router,
        store,
        render: (h) => h(App),
      });

      resolve(app);
    });
  });
};
