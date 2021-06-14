import { paths, views } from '@/type/views';
import Home from '@/views/Home.vue';
import store from '@/store';

const requireAuth = (to, from, next) => {
  store.state.auth ? next() : next('/user/login');
};

export default [
  {
    path: '/markets/',
    component: () => import('@/views/Markets.vue'),
    children: [
      { path: 'stocks', component: () => import('@/components/templates/Markets/Stocks.vue') },
      { path: 'stocks/:ticker', component: () => import('@/components/templates/Markets/StocksDetail.vue') },
      { path: 'indexes', component: () => import('@/components/templates/Markets/Indexes.vue') },
      { path: 'indexes/:ticker', component: () => import('@/components/templates/Markets/IndexesDetail.vue') },
      { path: 'coins', component: () => import('@/components/templates/Markets/Coins.vue') },
      { path: 'coins/:ticker', component: () => import('@/components/templates/Markets/CoinsDetail.vue') },
    ],
  },
  {
    path: '/news/',
    name: views.News,
    component: () => import('@/views/News.vue'),
  },
  {
    path: paths.User,
    component: () => import('@/views/User.vue'),
    children: [
      { path: 'login', component: () => import('@/components/templates/User/Login.vue') },
      { path: 'join', component: () => import('@/components/templates/User/Join.vue') },
      { path: '', component: () => import('@/components/templates/User/index.vue'), beforeEnter: requireAuth, name: views.User },
    ],
  },
  {
    path: paths.Home,
    name: views.Home,
    component: Home,
  },
  {
    path: '*',
    component: Home,
  },
];
