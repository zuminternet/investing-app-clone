// 지수, 주식, 가상화폐 tickers
export const tickerMap = {
  index: {
    // 실제 api에서 사용되는 ticker
    FB: {
      //  화면에 표시될 종목 이름
      name: '나스닥100',
    },
    ADBE: {
      name: '다우존스30',
    },
    ADI: {
      name: 'S&P500',
    },
    ADP: {
      name: 'foo index',
    },
    ADSK: {
      name: 'bar index',
    },
  },
  crypto: {
    BIDU: {
      name: '비트코인',
    },
    EBAY: {
      name: '이더리움',
    },
    INTC: {
      name: 'foo coin',
    },
    MAR: {
      name: 'bar coin',
    },
    MNST: {
      name: 'baz coin',
    },
  },
  stock: {
    AAPL: {
      name: '애플',
    },
    GOOG: {
      name: '구글',
    },
    TSLA: {
      name: '테슬라',
    },
    AMZN: {
      name: '아마존',
    },
    PYPL: {
      name: '페이팔',
    },
  },
} as const;

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

export interface MarketStockEOD {
  date: Date;
  high: number;
  low: number;
  open: number;
  close: number;
  symbol: MarketSymbol;
}

export interface EndOfDay extends MarketStockEOD {
  display_name: string;
}

export interface HistoricalData {
  display_name: string;
  data: MarketStockEOD[];
}
