import Market from '@/views/Market.vue';
import { routePaths } from '@/config';

export default [
  {
    path: routePaths.market,
    name: 'Market',
    component: Market,
  },
  {
    path: routePaths.login,
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: routePaths.search,
    name: 'Search',
    component: () => import('@/views/Search.vue'),
  },
  {
    path: routePaths.setting,
    name: 'Setting',
    component: () => import('@/views/Setting.vue'),
  },
  {
    path: routePaths.news,
    name: 'News',
    component: () => import('@/views/News.vue'),
  },
  {
    path: routePaths.newsDetail,
    name: 'NewsDetail',
    component: () => import('@/views/NewsDetail.vue'),
  },
  {
    path: routePaths.marketDetail,
    name: 'MarketDetail',
    component: () => import('@/views/MarketDetail.vue'),
  },
  {
    path: routePaths.bookmark,
    name: 'Bookmark',
    component: () => import('@/views/Bookmark.vue'),
  },
  {
    path: routePaths.signup,
    name: 'Signup',
    component: () => import('@/views/Signup.vue'),
  },
  {
    path: routePaths.changeUserName,
    name: 'ChangeUserName',
    component: () => import('@/views/SettingUserName.vue'),
  },
  {
    path: routePaths.changePassword,
    name: 'ChangePassword',
    component: () => import('@/views/SettingPassword.vue'),
  },
];
