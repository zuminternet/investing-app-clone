import { paths, views } from '@/type/views';
import Home from '@/views/Home.vue';
import store from '@/store';

const requireAuth = (to, from, next) => {
  store.getters.getAuth ? next() : next('/user/login');
};

export default [
  {
    path: paths.MarketsRouter,
    name: views.Markets,
    component: () => import('@/views/Markets.vue'),
    props: ({ params: { type, ticker } }) => ({ type, ticker }),
  },
  {
    path: paths.News,
    name: views.News,
    component: () => import('@/views/News.vue'),
    props: ({ params: { ticker } }) => ({ ticker }),
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
