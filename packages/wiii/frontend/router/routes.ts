import { views } from '@/types';
import Home from '@/views/Home.vue';

export default [
  {
    path: '/**',
    name: views.Home,
    component: Home,
  },
];
