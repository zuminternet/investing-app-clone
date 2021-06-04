import { Service } from 'zum-portal-core/backend/decorator/Alias';
import * as yahooFinance from 'yahoo-finance';
import { marketStackConfig } from '../config';
import {
  MarketSymbol,
  SummaryDetail,
  EndOfDay,
  tickerMap,
  MarketStockEOD,
  HistoricalData,
  IntraDayChartMap,
  ChartPeriod,
} from '../../domain';
import axios, { AxiosInstance } from 'axios';

interface GetHistoricalDataProps {
  symbol: MarketSymbol;
  period: ChartPeriod;
}

@Service()
export default class MarketService {
  private readonly baseUrl = 'http://api.marketstack.com/v1';
  private readonly axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = axios.create({
      baseURL: this.baseUrl,
      params: { access_key: marketStackConfig.accessKey },
    });
  }

  private isValidSymbol(symbol: string) {
    return Object.keys(tickerMap).some((type: keyof typeof tickerMap) => {
      return Object.prototype.hasOwnProperty.call(tickerMap[type], symbol);
    });
  }

  private isValidPeriod(period: string) {
    return Object.prototype.hasOwnProperty.call(IntraDayChartMap, period);
  }

  private convertSymbolsToQueryString(symbols: MarketSymbol[]) {
    return symbols.join(',');
  }

  private getDisplayName(symbol: MarketSymbol): string {
    const { stock, crypto, index } = tickerMap;

    if (stock[symbol]?.name) return stock[symbol].name;
    if (crypto[symbol]?.name) return crypto[symbol].name;
    if (index[symbol]?.name) return index[symbol].name;

    throw new Error('invalid symbol');
  }

  private convertEOD(eod: MarketStockEOD): EndOfDay {
    const displayName = this.getDisplayName(eod.symbol);
    const wasChanged = !Number.isNaN(eod.close - eod.open);
    const diff = wasChanged ? +(eod.close - eod.open).toFixed(2) : 0;
    const growthRate = wasChanged ? +((diff / eod.open) * 100).toFixed(2) : 0;

    return { ...eod, display_name: displayName, diff, growthRate };
  }

  private getIntraDayOptions(period: ChartPeriod) {
    const { interval, dateFrom, dateTo } = IntraDayChartMap[period];
    return { interval, date_from: dateFrom(), date_to: dateTo() };
  }

  /**
   * getLatestEOD
   *
   * 여러 종목의 가장 최근 end-of-day 데이터를 반환한다
   *
   * @author dogyeong
   * @param {MarketSymbol[]} symbols ticker 심볼 배열
   */
  public async getLatestEOD(symbols: MarketSymbol[]): Promise<EndOfDay[]> {
    if (!symbols.every(this.isValidSymbol.bind(this))) throw new Error('invalid symbol');

    const symbolQueryStr = this.convertSymbolsToQueryString(symbols);
    const { data: response } = await this.axiosClient.get('/eod/latest', {
      params: { symbols: symbolQueryStr },
    });

    return response?.data?.map(this.convertEOD.bind(this)) ?? [];
  }

  /**
   * getSummaryDetail
   *
   * 한 종목의 개요 정보를 반환한다
   *
   * @author dogyeong
   * @param {MarketSymbol} symbol ticker 심볼
   */
  public async getSummaryDetail(symbol: MarketSymbol): Promise<SummaryDetail> {
    if (!this.isValidSymbol(symbol)) throw new Error('invalid symbol');

    const { summaryDetail } = await yahooFinance.quote({
      symbol,
      modules: ['summaryDetail'],
    });

    return summaryDetail;
  }

  /**
   * getHistoricalData
   *
   * 한 종목의 HistoricalData를 반환한다
   *
   * @author dogyeong
   * @param {MarketSymbol} symbol ticker 심볼
   */
  public async getHistoricalData({ symbol, period }: GetHistoricalDataProps): Promise<HistoricalData> {
    if (!this.isValidSymbol(symbol)) throw new Error('invalid symbol');
    if (!this.isValidPeriod(period)) throw new Error('invalid period');

    const { data: response } = await this.axiosClient.get(`/tickers/${symbol}/intraday`, {
      params: this.getIntraDayOptions(period),
    });
    const displayName = this.getDisplayName(symbol);

    return {
      display_name: displayName,
      data: response?.data?.intraday ?? [],
    };
  }
}
