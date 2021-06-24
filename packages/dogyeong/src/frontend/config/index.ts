export const apiEndpoints = {
  signup: '/api/user',
  login: '/api/auth',
  googleLogin: '/api/auth/google',
  fetchUser: '/api/user',
  logout: '/api/logout',
  getIndices: '/api/market/indices',
  getCoins: '/api/market/coins',
  getStocks: '/api/market/stocks',
  getSummary: '/api/market/summary',
  getChart: '/api/market/chart',
  getNewNews: '/api/article/news/new',
  getNewOpinions: '/api/article/opinions/new',
  getPopularNews: '/api/article/news/popular',
  getPopularOpinions: '/api/article/opinions/popular',
  getArticle: '/api/article',
  changeUserInfo: '/api/user',
  searchItems: '/api/search/items',
  searchNews: '/api/search/news',
  searchOpinions: '/api/search/opinions',
  addBookmark: '/api/bookmark',
  removeBookmark: '/api/bookmark',
  getBookmarks: '/api/bookmark',
};

export const googleAuthInitConfig = {
  lib: 'auth2',
  args: {
    client_id: '266193407466-7qvkgbj34vr3k5dbf0o31gnsii3b78s4.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/userinfo.profile',
    access_type: 'code',
  },
};

export const googleAuthOptions = { prompt: 'select_account' };

export const googleAuthHeader = 'inv_google_auth';

export const chartLightThemeOption = {
  bgColor: '#fdfcf7',
  blueColor: 'blue',
  redColor: 'red',
  textColor: 'black',
  lineFillColor: '#f0f4ff',
  lineStrokeColor: '#84bbf3',
  graphLineColor: '#eee',
};

export const routePaths = {
  market: '/',
  marketDetail: '/market/:type/:id',
  news: '/news',
  newsDetail: '/news/:type/:id',
  login: '/login',
  signup: '/signup',
  search: '/search',
  setting: '/setting',
  bookmark: '/bookmark',
  changeUserName: '/change-username',
  changePassword: '/change-password',
};
