import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import Sub from '@/views/Sub.vue';

Vue.use(Router);

export default () => {
  return new Router({
    mode: 'history',
    base: process.env.publicPath,

    routes: [
      {
        path: '/',
        name: 'Home',
        component: Home,
      },
      {
        path: '/sub',
        name: 'Sub',
        component: Sub,
      },
    ],
  });
};
