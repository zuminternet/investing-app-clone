export const apiEndpoints = {
  signup: '/api/user',
  login: '/api/auth',
  googleLogin: '/api/auth/google',
  fetchUser: '/api/user',
  logout: '/api/logout',
  getIndices: '/api/indices',
  getCoins: '/api/coins',
  getStocks: '/api/stocks',
  getSummary: '/api/summary',
  getChart: '/api/chart',
  getNews: '/api/news',
  getOpinions: '/api/opinions',
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
