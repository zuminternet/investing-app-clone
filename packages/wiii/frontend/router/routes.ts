import { viewEnums } from '@/type';
import Home from '@/views/Home.vue';
import Markets from '@/views/Markets.vue';
import News from '@/views/News.vue';
import User from '@/views/User.vue';

const { paths, views } = viewEnums;

export default [
  {
    path: paths.MarketsRouter,
    name: views.Markets,
    component: Markets,
  },
  {
    path: paths.User,
    name: views.User,
    component: User,
  },
  {
    path: paths.News,
    name: views.News,
    component: News,
  },
  {
    path: paths.Home,
    name: views.Home,
    component: Home,
  },
];
