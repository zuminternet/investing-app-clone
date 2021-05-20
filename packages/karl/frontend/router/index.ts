import Vue from 'vue';
import Router from 'vue-router';
import { Login, Home } from '../views'
import ItemDetail from '../../../common/frontend/views/ItemDetail.vue'
// import Login from '../views/Login.vue'
// import Home from '../views/Home.vue'
// import ItemDetail from '../views/ItemDetail.vue'
Vue.use(Router);

export default () => {
  return new Router({
    mode: 'history',
    base: process.env.publicPath,

    routes: [
      {
        path: '/',
        name: 'Login',
        component: Login,
      },
      {
        path: '/home',
        name: 'Home',
        component: Home,
      },
      {
        path:'/item-detail',
        name: 'ItemDetail',
        component: ItemDetail
      }
    ],
  });
};
