import Vue from 'vue';
import Router from 'vue-router';
import { Market, Login, Search, Setting, Bookmark, News } from '@/views';

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
        component: Login,
      },
      {
        path: '/search',
        name: 'Search',
        component: Search,
      },
      {
        path: '/setting',
        name: 'Setting',
        component: Setting,
      },
      {
        path: '/news',
        name: 'News',
        component: News,
      },
      {
        path: '/bookmark',
        name: 'Bookmark',
        component: Bookmark,
      },
    ],
  });
};
