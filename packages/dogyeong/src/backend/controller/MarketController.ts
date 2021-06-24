import { Controller, GetMapping } from 'zum-portal-core/backend/decorator/Controller';
import { Request, Response } from 'express';
import { Inject } from 'zum-portal-core/backend/decorator/Alias';
import MarketService from 'common/backend/service/MarketService';
import {
  EndOfDay,
  tickerMap,
  StockSymbol,
  IndexSymbol,
  CryptoSymbol,
  MarketSymbol,
  ChartPeriod,
  HistoricalData,
} from 'common/domain';

@Controller({ path: '/api/market' })
export class MarketController {
  constructor(@Inject(MarketService) private marketService: MarketService) {}

  // 난수를 생성하는 함수
  // bcrypt에서 패스워드에 추가하는 임의의 값을 salt라고 부르는 것에서 따와서 난수를 Salt라고 명명
  private createSalt() {
    const random1 = Math.random();
    const random2 = Math.random();
    const salt = (random1 > 0.5 ? 2 : -2) * random2;
    return salt;
  }

  // EOD에 난수 더하기
  private addSaltToEOD(eods: EndOfDay[]) {
    if (!eods.length) return eods;

    const salt = this.createSalt();
    const index = Math.floor(Math.random() * eods.length);
    const { diff, growthRate } = eods[index];
    eods[index].close = +(eods[index].close + salt).toFixed(2);
    eods[index].diff = +(eods[index].diff + salt).toFixed(2);
    eods[index].growthRate = ((diff + salt) * growthRate) / diff;

    return eods;
  }

  // 차트 데이터에 난수 더하기
  private addSaltToHistoricalData(historicalData: HistoricalData) {
    const salt = this.createSalt();
    const lastCandle = historicalData.data[0];
    if (lastCandle) lastCandle.close = +(lastCandle.close + salt).toFixed(2);
    return historicalData;
  }

  @GetMapping({ path: ['/indices'] })
  public async getIndices(req: Request, res: Response) {
    try {
      const indexSymbols = Object.keys(tickerMap.index) as IndexSymbol[];
      const indices = await this.marketService.getLatestEOD(indexSymbols);
      res.json(this.addSaltToEOD(indices));
    } catch (err) {
      res.status(500).json({ err: err.message ?? err });
    }
  }

  @GetMapping({ path: ['/coins'] })
  public async getCoins(req: Request, res: Response) {
    try {
      const coinSymbols = Object.keys(tickerMap.crypto) as CryptoSymbol[];
      const coins = await this.marketService.getLatestEOD(coinSymbols);
      res.json(this.addSaltToEOD(coins));
    } catch (err) {
      res.status(500).json({ err: err.message ?? err });
    }
  }

  @GetMapping({ path: ['/stocks'] })
  public async getStocks(req: Request, res: Response) {
    try {
      const stockSymbols = Object.keys(tickerMap.stock) as StockSymbol[];
      const stocks = await this.marketService.getLatestEOD(stockSymbols);
      res.json(this.addSaltToEOD(stocks));
    } catch (err) {
      res.status(500).json({ err: err.message ?? err });
    }
  }

  @GetMapping({ path: ['/summary/:symbol'] })
  public async getSummary(req: Request, res: Response) {
    try {
      const { symbol } = req.params;
      const summary = await this.marketService.getSummaryDetail(symbol as MarketSymbol);
      res.json(summary);
    } catch (err) {
      res.status(500).json({ err: err.message ?? err });
    }
  }

  @GetMapping({ path: ['/chart/:symbol'] })
  public async getChart(req: Request, res: Response) {
    try {
      const { symbol } = req.params;
      const { period } = req.query;
      const chart = await this.marketService.getHistoricalData(symbol as MarketSymbol, period as ChartPeriod);
      res.json(this.addSaltToHistoricalData(chart));
    } catch (err) {
      res.status(500).json({ err: err.message ?? err });
    }
  }
}
