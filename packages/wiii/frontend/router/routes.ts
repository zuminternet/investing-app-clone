import { paths, views } from '@/type/views';
import Home from '@/views/Home.vue';

export default [
  {
    path: paths.MarketsRouter,
    name: views.Markets,
    component: () => import('@/views/Markets.vue'),
    props: ({ params: { type, ticker } }) => ({ type, ticker }),
  },
  {
    path: paths.User,
    name: views.User,
    component: () => import('@/views/User.vue'),
  },
  {
    path: paths.News,
    name: views.News,
    component: () => import('@/views/News.vue'),
    props: ({ params: { ticker } }) => ({ ticker }),
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
