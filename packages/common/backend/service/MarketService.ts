import { Service } from 'zum-portal-core/backend/decorator/Alias';
import { Caching } from 'zum-portal-core/backend/decorator/Caching';
import * as yahooFinance from 'yahoo-finance';
import { marketStackConfig } from '../config';
import {
  MarketSymbol,
  SummaryDetail,
  EndOfDay,
  tickerMap,
  MarketStackEOD,
  HistoricalData,
  IntraDayChartMap,
  ChartPeriod,
} from '../../domain';
import axios, { AxiosInstance } from 'axios';
import * as NodeCache from 'node-cache';

const cache = new NodeCache({ deleteOnExpire: true });
const cacheTTL = 99999;

interface MarketStackEODResponse {
  data: MarketStackEOD[];
}

/**
 * MarketService
 *
 * 시장 탭과 관련된 주식, 가상화폐, 지수들의 일일데이터, 상세개요, 차트 데이터 등을 관리하는 서비스
 *
 * @author dogyeong
 */
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

  /**
   * isValidSymbol
   *
   * 입력받은 ticker가 tickerMap에 있는지 검사한다
   *
   * @param symbol ticker 심볼
   */
  private isValidSymbol(symbol: string): boolean {
    return Object.keys(tickerMap).some((type: keyof typeof tickerMap) => {
      return {}.hasOwnProperty.call(tickerMap[type], symbol);
    });
  }

  /**
   * isValidPeriod
   *
   * 입력받은 period가 IntraDayChartMap에 있는지 검사한다
   *
   * @param period
   */
  private isValidPeriod(period: string): boolean {
    return {}.hasOwnProperty.call(IntraDayChartMap, period);
  }

  /**
   * getDisplayName
   *
   * 입력받은 ticker의 화면에 표시될 종목명을 반환한다
   *
   * @param symbol ticker 심볼
   */
  private getDisplayName(symbol: MarketSymbol): string {
    const tickersByMarket = Object.values(tickerMap);
    const ticker = tickersByMarket.reduce((prev, cur) => Object.assign(prev, cur), {})[symbol];

    if (!ticker?.name) throw new Error('invalid symbol');

    return ticker.name;
  }

  /**
   * convertEOD
   *
   * eod 데이터에 화면에 표시될 프로퍼티를 추가하는 메소드
   *
   * @param eod 마켓스택api로 받아온 eod데이터
   */
  private convertEOD(eod: MarketStackEOD): EndOfDay {
    const displayName = this.getDisplayName(eod.symbol);
    const wasChanged = !Number.isNaN(eod.close - eod.open);
    const diff = wasChanged ? +(eod.close - eod.open).toFixed(2) : 0;
    const growthRate = wasChanged ? +((diff / eod.open) * 100).toFixed(2) : 0;

    return { ...eod, display_name: displayName, diff, growthRate };
  }

  /**
   * getIntraDayOptions
   *
   * yahooFinance api로 차트 데이터를 받아올 때 필요한 기간 옵션 객체를 만드는 메소드
   *
   * @param period 기간 문자열
   */
  private getIntraDayOptions(period: ChartPeriod) {
    const { interval, dateFrom, dateTo } = IntraDayChartMap[period];
    return { period: interval, from: dateFrom(), to: dateTo() };
  }

  /**
   * getLatestEOD
   *
   * 여러 종목의 가장 최근 end-of-day 데이터를 반환한다
   *
   * @param {MarketSymbol[]} symbols ticker 심볼 배열
   */
  @Caching({ ttl: cacheTTL, cache, runOnStart: false })
  public async getLatestEOD(symbols: MarketSymbol[]): Promise<EndOfDay[]> {
    if (!symbols.every(this.isValidSymbol.bind(this))) throw new Error('invalid symbol');

    const symbolQueryStr = symbols.join(',');
    const { data: response } = await this.axiosClient.get<MarketStackEODResponse>('/eod/latest', {
      params: { symbols: symbolQueryStr },
    });

    return response?.data?.map(this.convertEOD.bind(this)) ?? [];
  }

  /**
   * getSummaryDetail
   *
   * 한 종목의 개요 정보를 반환하는 메소드
   *
   * @param {MarketSymbol} symbol ticker 심볼
   */
  @Caching({ ttl: cacheTTL, cache, runOnStart: false })
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
   * 한 종목의 HistoricalData를 반환하는 메소드
   *
   * @param {MarketSymbol} symbol ticker 심볼
   */
  @Caching({ ttl: cacheTTL, cache, runOnStart: false })
  public async getHistoricalData(symbol: MarketSymbol, period: ChartPeriod): Promise<HistoricalData> {
    if (!this.isValidSymbol(symbol)) throw new Error('invalid symbol');
    if (!this.isValidPeriod(period)) throw new Error('invalid period');

    const response = await yahooFinance.historical({
      symbol,
      ...this.getIntraDayOptions(period),
    });
    const displayName = this.getDisplayName(symbol);

    return {
      display_name: displayName,
      data: response ?? [],
    };
  }
}
