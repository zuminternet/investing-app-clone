import Vue from 'vue';
import Router from 'vue-router';

import { views } from '@/types';
import Home from '@/views/Home.vue';

Vue.use(Router);

export default () => {
  return new Router({
    mode: 'history',
    base: process.env.publicPath,

    routes: [
      {
        path: '/**',
        name: views.Home,
        component: Home,
      },
    ],
  });
};
