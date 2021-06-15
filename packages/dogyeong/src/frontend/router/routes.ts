import Market from '@/views/Market.vue';

export default [
  {
    path: '/',
    name: 'Market',
    component: Market,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/Search.vue'),
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('@/views/Setting.vue'),
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('@/views/News.vue'),
  },
  {
    path: '/news/:type/:id',
    name: 'NewsDetail',
    component: () => import('@/views/NewsDetail.vue'),
  },
  {
    path: '/market/:type/:id',
    name: 'MarketDetail',
    component: () => import('@/views/MarketDetail.vue'),
  },
  {
    path: '/bookmark',
    name: 'Bookmark',
    component: () => import('@/views/Bookmark.vue'),
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/views/Signup.vue'),
  },
  {
    path: '/change-username',
    name: 'ChangeUserName',
    component: () => import('@/views/SettingUserName.vue'),
  },
  {
    path: '/change-password',
    name: 'ChangePassword',
    component: () => import('@/views/SettingPassword.vue'),
  },
];