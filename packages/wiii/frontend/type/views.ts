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

const markets = {
  stocks: 'stocks',
  indexes: 'indexes',
  coins: 'coins',
} as const;

export type marketsType = typeof markets[keyof typeof markets];

export const paths = {
  Home: '/',
  Markets: '/markets/',
  MarketsRouter: '/markets/:type/:ticker',
  StocksMarket: `/markets/${markets.stocks}`,
  IndexMarket: `/markets/${markets.indexes}`,
  CoinMarket: `/markets/${markets.coins}`,
  News: '/news/:ticker',
  User: '/user/',
  SignUp: '/user/signup',
  LogIn: '/user/login',
  LogOut: '/user/logout',
} as const;

export type pathsType = typeof paths[keyof typeof paths];

export enum selectors {
  anchorHref = 'a[href]',
}
