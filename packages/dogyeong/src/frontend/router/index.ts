import Vue from 'vue';
import Router from 'vue-router';
import routes from '@/router/routes';

Vue.use(Router);

export default () => {
  return new Router({
    mode: 'history',

    base: process.env.publicPath,

    routes,

    // 네이티브같은 스크롤 동작을 위해 scroll 위치 저장 및 초기화
    // https://router.vuejs.org/kr/guide/advanced/scroll-behavior.html
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    },
  });
};
