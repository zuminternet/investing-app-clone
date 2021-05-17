import Vue from 'vue';
import Router from 'vue-router';

import routes from '@/router/routes';

Vue.use(Router);

export default () => {
  return new Router({
    mode: 'history',
    base: process.env.publicPath,
    routes,
  });
};
