import Vue from 'vue';
import Router from 'vue-router';
import routes from '@/router/routes';
import { store } from '@/store';

Vue.use(Router);

export default () => {
  const router = new Router({
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

  // 네비게이션 가드 구현
  // https://router.vuejs.org/kr/guide/advanced/meta.html
  router.beforeEach((routeTo, routeFrom, next) => {
    // 이동할 페이지에서 인증이 필요한지 체크
    const requiresAuth = routeTo.matched.some((route) => route.meta.requiresAuth);

    // 인증이 필요없으면 이동
    if (!requiresAuth) return next();

    // 로그인 되어있으면 이동
    if (store.getters.isLoggedIn) return next();

    // 인증이 필요한데 로그인 안돼있으면 로그인 페이지로 리다이렉션
    redirectToLogin();

    function redirectToLogin() {
      // Pass the original route to the login component
      next({ name: 'Login', query: { redirectFrom: routeTo.fullPath } });
    }
  });

  return router;
};
