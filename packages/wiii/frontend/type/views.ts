export enum views {
  Home = 'Home',
  Markets = 'Markets',
  News = 'News',
  User = 'User',
}

export enum viewsTitle {
  Home = '인베스팅 ZUM',
  Markets = 'Markets',
  News = 'News',
  User = 'User',
}

export enum paths {
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

export enum selectors {
  anchorHref = 'a[href]',
}

export const HomeMenuData = [
  { id: views.Home, name: '홈', href: paths.Home },
  { id: views.Markets, name: '마켓', href: paths.IndexMarket },
  { id: views.News, name: '뉴스', href: paths.News },
] as const;
