import { Service } from 'zum-portal-core/backend/decorator/Alias';
import * as yahooFinance from 'yahoo-finance';
import { investing } from 'investing-com-api';

interface InvestingData {
  date: number;
  value: number;
}

export interface InvestingApiResponse {
  key: string;
  result: InvestingData;
}

export interface CandleChartData {
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  adjClose: number;
  symbol: string;
}

export interface SummaryDetail {
  summaryDetail: {
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
  };
}

enum Indices {
  dowJones30 = 'indices/us-30',
  nasdaq100 = 'indices/nq-100',
  snp500 = 'indices/us-spx-500',
  dax = 'indices/germany-30',
  ftse100 = 'indices/uk-100',
  cac40 = 'indices/france-40',
  nikkei225 = 'indices/japan-ni225',
  ftseMib = 'indices/it-mib-40',
}

enum Cryptos {
  btcUsd = 'crypto/bitcoin/btc-usd',
  ethUsd = 'crypto/ethereum/eth-usd?c997650',
  bchUsd = 'crypto/bitcoin-cash/bch-usd',
  iotaUsd = 'crypto/iota/iota-usd',
  ltcUsd = 'crypto/litecoin/ltc-usd?c1010798',
}

enum Stocks {
  apple = 'equities/apple-computer-inc',
  google = 'equities/google-inc',
  tesla = 'equities/tesla-motors',
}

@Service()
export default class MarketService {
  private callInvesting([key, investingId]) {
    return new Promise<InvestingApiResponse>((resolve, reject) => {
      investing(investingId)
        .then((result) => resolve({ key, result }))
        .catch(reject);
    });
  }

  /** @TODO 캐싱 적용 */
  // 지수
  public getIndices() {
    return Promise.all(Object.entries(Indices).map(this.callInvesting));
  }

  // 암호화폐
  public getCoins() {
    return Promise.all(Object.entries(Cryptos).map(this.callInvesting));
  }

  // 주식
  public getStocks() {
    return Promise.all(Object.entries(Stocks).map(this.callInvesting));
  }

  // 종목상세 : 52주 변동폭, 일일 변동폭, 거래량(volume), 시가총액(marketcap), 매수가(bid), 매도가(ask),
  public getSummaryDetail(symbol: string): Promise<SummaryDetail> {
    return yahooFinance.quote({
      symbol,
      modules: ['summaryDetail'],
    });
  }

  // 캔들차트 데이터
  public getCandleChartData(symbol: string): Promise<CandleChartData[]> {
    return yahooFinance.historical({
      symbol,
      from: '2012-01-01',
      to: '2012-12-31',
      // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
    });
  }
}
