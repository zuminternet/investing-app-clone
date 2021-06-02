import Vue from 'vue';
import Router from 'vue-router';
import Market from '@/views/Market.vue';

Vue.use(Router);

export default () => {
  return new Router({
    mode: 'history',
    base: process.env.publicPath,

    routes: [
      {
        path: '/',
        name: 'Market',
        component: Market,
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
      },
      {
        path: '/search',
        name: 'Search',
        component: () => import('@/views/Search.vue'),
      },
      {
        path: '/setting',
        name: 'Setting',
        component: () => import('@/views/Setting.vue'),
      },
      {
        path: '/news',
        name: 'News',
        component: () => import('@/views/News.vue'),
      },
      {
        path: '/news/:type/:id',
        name: 'NewsDetail',
        component: () => import('@/views/NewsDetail.vue'),
      },
      {
        path: '/bookmark',
        name: 'Bookmark',
        component: () => import('@/views/Bookmark.vue'),
      },
      {
        path: '/signup',
        name: 'Signup',
        component: () => import('@/views/Signup.vue'),
      },
    ],
  });
};
