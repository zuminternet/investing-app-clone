// 지수, 주식, 가상화폐 tickers
export const tickerMap = {
  index: {
    // 실제 api에서 사용되는 ticker
    FB: {
      //  화면에 표시될 종목 이름
      name: '나스닥100',
      // investingId end point 이름
      investingId: 'indices/nq-100',
      // 화면에 표시될 소속 이름
      category: 'zum-investing-app',
    },
    ADBE: {
      name: '다우존스30',
      investingId: 'indices/us-30',
      category: 'zum-investing-app',
    },
    ADI: {
      name: 'S&P500',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    ADP: {
      name: 'foo index',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    ADSK: {
      name: 'bar index',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
  },
  crypto: {
    BIDU: {
      name: '비트코인',
      investingId: 'crypto/bitcoin/btc-usd',
      category: 'zum-investing-app',
    },
    EBAY: {
      name: '이더리움',
      investingId: 'crypto/ethereum/eth-usd?c997650',
      category: 'zum-investing-app',
    },
    INTC: {
      name: 'foo coin',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    MAR: {
      name: 'bar coin',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
    MNST: {
      name: 'baz coin',
      investingId: 'equities/apple-computer-inc',
      category: 'zum-investing-app',
    },
  },
  stock: {
    AAPL: {
      name: '애플',
      investingId: 'equities/apple-computer-inc',
      category: 'NASDAQ',
    },
    GOOG: {
      name: '구글',
      investingId: 'equities/apple-computer-inc',
      category: 'NASDAQ',
    },
    TSLA: {
      name: '테슬라',
      investingId: 'equities/apple-computer-inc',
      category: 'NASDAQ',
    },
    AMZN: {
      name: '아마존',
      investingId: 'equities/amazon-com-inc',
      category: 'NASDAQ',
    },
    PYPL: {
      name: '페이팔',
      investingId: 'equities/apple-computer-inc',
      category: 'NASDAQ',
    },
  },
} as const;

export const tickerKeys = [...Object.keys(tickerMap.stock), ...Object.keys(tickerMap.index), ...Object.keys(tickerMap.crypto)];

const findMatchedTickers = (keyword: string) => {
  if (typeof keyword !== 'string') throw new Error('Keyword must be string');
  return tickerKeys.filter((ticker) => ticker.includes(keyword));
};

export const getMatchedTickers = (keywords: string | string[]): string[] => {
  if (typeof keywords === 'string') {
    return findMatchedTickers(keywords);
  }
  if (Array.isArray(keywords)) {
    return [...new Set(keywords.flatMap(findMatchedTickers))];
  }

  throw new Error('Keywords must be string or array of string');
};

export type IndexSymbol = keyof typeof tickerMap.index;

export type CryptoSymbol = keyof typeof tickerMap.crypto;

export type StockSymbol = keyof typeof tickerMap.stock;

export type MarketSymbol = IndexSymbol | CryptoSymbol | StockSymbol;

// 종목상세 : 52주 변동폭, 일일 변동폭, 거래량(volume), 시가총액(marketcap), 매수가(bid), 매도가(ask),
export interface SummaryDetail {
  maxAge: number;
  priceHint: number;
  previousClose: number;
  open: number;
  dayLow: number;
  dayHigh: number;
  regularMarketPreviousClose: number;
  regularMarketOpen: number;
  regularMarketDayLow: number;
  regularMarketDayHigh: number;
  dividendRate: number;
  dividendYield: number;
  exDividendDate: Date;
  payoutRatio: number;
  fiveYearAvgDividendYield: number;
  beta: number;
  trailingPE: number;
  forwardPE: number;
  volume: number;
  regularMarketVolume: number;
  averageVolume: number;
  averageVolume10days: number;
  averageDailyVolume10Day: number;
  bid: number;
  ask: number;
  bidSize: number;
  askSize: number;
  marketCap: number;
  fiftyTwoWeekLow: number;
  fiftyTwoWeekHigh: number;
  priceToSalesTrailing12Months: number;
  fiftyDayAverage: number;
  twoHundredDayAverage: number;
  trailingAnnualDividendRate: number;
  trailingAnnualDividendYield: number;
}

export interface MarketStackEOD {
  date: Date;
  high: number;
  low: number;
  open: number;
  close: number;
  symbol: MarketSymbol;
}

export interface EndOfDay extends MarketStackEOD {
  display_name: string;
  diff: number;
  growthRate: number;
}

export interface HistoricalData {
  display_name: string;
  data: MarketStackEOD[];
}

const getPastDateString = ({ day = 0, month = 0, year = 0 } = {}) => {
  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();
  date.setFullYear(y - year);
  date.setMonth(m - month);
  date.setDate(d - day);

  return date
    .toLocaleDateString()
    .split('. ')
    .map(Number)
    .map((n) => n.toString().padStart(2, '0'))
    .join('-');
};

export const IntraDayChartMap = {
  '1d': {
    interval: 'd',
    dateFrom: () => getPastDateString({ day: 1 }),
    dateTo: () => getPastDateString(),
  },
  '1w': {
    interval: 'd',
    dateFrom: () => getPastDateString({ day: 7 }),
    dateTo: () => getPastDateString(),
  },
  '1m': {
    interval: 'd',
    dateFrom: () => getPastDateString({ month: 1 }),
    dateTo: () => getPastDateString(),
  },
  '1y': {
    interval: 'd',
    dateFrom: () => getPastDateString({ year: 1 }),
    dateTo: () => getPastDateString(),
  },
  '5y': {
    interval: 'w',
    dateFrom: () => getPastDateString({ year: 5 }),
    dateTo: () => getPastDateString(),
  },
  max: {
    interval: 'm',
    dateFrom: () => getPastDateString({ year: 1000 }),
    dateTo: () => getPastDateString(),
  },
} as const;

export type ChartPeriod = keyof typeof IntraDayChartMap;

// 캐시 관련
const secondUnit = 1000;
const hourUnit = 60 * 60 * secondUnit;
const dayUnit = 24 * hourUnit;
const weekUnit = dayUnit * 7;
const yearUnit = dayUnit * 365;

export const times = {
  //캐싱 60초
  caching: 60,
};

// 개발 모드
export const isProductionMode = process.env.MODE_ENV === 'production';

export const getTickerArray = (tickers: string[] | string | undefined): string[] | undefined => {
  if (typeof tickers === 'string') return [tickers];
  return tickers;
};
