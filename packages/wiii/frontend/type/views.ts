enum views {
  Home = 'Home',
  Markets = 'Markets',
  News = 'News',
  User = 'User',
}

enum viewsTitle {
  Home = 'ZUM 인베스팅',
  Markets = 'Markets',
  News = 'News',
  User = 'User',
}

enum paths {
  Home = '/',
  Markets = '/markets/',
  MarketsRouter = '/markets/:detail',
  StocksMarket = '/markets/stocks',
  IndexMarket = '/markets/indexes',
  CoinMarket = '/markets/coins',
  News = '/news',
  User = '/user/',
  SignUp = '/user/signup',
  LogIn = '/user/login',
  LogOut = '/user/logout',
}

enum selectors {
  anchorHref = 'a[href]',
}

export default {
  views,
  viewsTitle,
  paths,
  selectors,
};
