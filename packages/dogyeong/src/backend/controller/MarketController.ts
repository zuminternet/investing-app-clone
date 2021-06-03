import { Controller, GetMapping } from 'zum-portal-core/backend/decorator/Controller';
import { Request, Response } from 'express';
import { Inject } from 'zum-portal-core/backend/decorator/Alias';
import MarketService from 'common/backend/service/MarketService';
import { tickerMap, StockSymbol, IndexSymbol, CryptoSymbol, MarketSymbol } from 'common/domain';

@Controller({ path: '/api/market' })
export class MarketController {
  constructor(@Inject(MarketService) private marketService: MarketService) {}

  @GetMapping({ path: ['/indices'] })
  public async getIndices(req: Request, res: Response) {
    try {
      const indexSymbols = Object.keys(tickerMap.index) as IndexSymbol[];
      const indices = await this.marketService.getLatestEOD(indexSymbols);
      res.json(indices);
    } catch (err) {
      res.status(500).json({ err: err.message ?? err });
    }
  }

  @GetMapping({ path: ['/coins'] })
  public async getCoins(req: Request, res: Response) {
    try {
      const coinSymbols = Object.keys(tickerMap.crypto) as CryptoSymbol[];
      const coins = await this.marketService.getLatestEOD(coinSymbols);
      res.json(coins);
    } catch (err) {
      res.status(500).json({ err: err.message ?? err });
    }
  }

  @GetMapping({ path: ['/stocks'] })
  public async getStocks(req: Request, res: Response) {
    try {
      const stockSymbols = Object.keys(tickerMap.stock) as StockSymbol[];
      const stocks = await this.marketService.getLatestEOD(stockSymbols);
      res.json(stocks);
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
      const chart = await this.marketService.getHistoricalData(symbol as MarketSymbol);
      res.json(chart);
    } catch (err) {
      res.status(500).json({ err: err.message ?? err });
    }
  }
}
