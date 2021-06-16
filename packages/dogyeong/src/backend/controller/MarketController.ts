import { Controller, GetMapping } from 'zum-portal-core/backend/decorator/Controller';
import { Request, Response } from 'express';
import { Inject } from 'zum-portal-core/backend/decorator/Alias';
import MarketService from 'common/backend/service/MarketService';
import { EndOfDay, tickerMap, StockSymbol, IndexSymbol, CryptoSymbol, MarketSymbol, ChartPeriod } from 'common/domain';

@Controller({ path: '/api/market' })
export class MarketController {
  constructor(@Inject(MarketService) private marketService: MarketService) {}

  // 현재가에 난수 더하기
  private addSalt(eods: EndOfDay[]) {
    if (!eods.length) return eods;

    const random1 = Math.random();
    const random2 = Math.random();
    const salt = (random1 > 0.5 ? 1 : -1) * random2;
    const index = Math.floor(random1 * eods.length);
    const { diff, growthRate } = eods[index];
    eods[index].diff += salt;
    eods[index].growthRate = ((diff + salt) * growthRate) / diff;

    return eods;
  }

  @GetMapping({ path: ['/indices'] })
  public async getIndices(req: Request, res: Response) {
    try {
      const indexSymbols = Object.keys(tickerMap.index) as IndexSymbol[];
      const indices = await this.marketService.getLatestEOD(indexSymbols);
      res.json(this.addSalt(indices));
    } catch (err) {
      res.status(500).json({ err: err.message ?? err });
    }
  }

  @GetMapping({ path: ['/coins'] })
  public async getCoins(req: Request, res: Response) {
    try {
      const coinSymbols = Object.keys(tickerMap.crypto) as CryptoSymbol[];
      const coins = await this.marketService.getLatestEOD(coinSymbols);
      res.json(this.addSalt(coins));
    } catch (err) {
      res.status(500).json({ err: err.message ?? err });
    }
  }

  @GetMapping({ path: ['/stocks'] })
  public async getStocks(req: Request, res: Response) {
    try {
      const stockSymbols = Object.keys(tickerMap.stock) as StockSymbol[];
      const stocks = await this.marketService.getLatestEOD(stockSymbols);
      res.json(this.addSalt(stocks));
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
      res.json(chart);
    } catch (err) {
      res.status(500).json({ err: err.message ?? err });
    }
  }
}
