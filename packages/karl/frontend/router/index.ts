import Vue from 'vue';
import Router from 'vue-router';
import { Login, Home, Signup } from '../views';
import ItemDetail from '../../../common/frontend/views/ItemDetail.vue';
import Search from '../../../common/frontend/views/Search.vue';
import Bookmark from '../../../common/frontend/views/Bookmark.vue';
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
        path: '/signup',
        name: 'Signup',
        component: Signup,
      },
      {
        path: '/market',
        name: 'Market',
        component: Home,
      },
      {
        path: '/item-detail',
        name: 'ItemDetail',
        component: ItemDetail,
      },
      {
        path: '/search',
        name: 'Search',
        component: Search,
      },
      {
        path: '/bookmark',
        name: 'Bookmark',
        component: Bookmark,
      },
    ],
  });
};
