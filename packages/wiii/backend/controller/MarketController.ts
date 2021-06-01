import { Request, Response } from 'express';
import { Controller, GetMapping } from 'zum-portal-core/backend/decorator/Controller';

import SSE from './SSE';
import { GetHistoricalOptions } from '../../domain/apiOptions';
import { marketHome, marketName, marketSubpaths } from '../../domain/apiUrls';
import { MarketService } from '../service/MarketService';
import { times } from '../../domain/date';

/**
 * parseQueryToOptions
 * @param path 타입 구분을 위한 경로; historical | stocks | indexes | coins
 * @param param req.param 객체
 * @returns API 요청에 필요한 options 객체
 */
const parseQueryToOptions = (path: marketName, param): GetHistoricalOptions => {
  if (path === marketName.historical) {
    const { type, ticker, exchange, dateFrom, dateTo, interval, sort, limit, offset } = param;
    return {
      type,
      ticker,
      exchange,
      dateFrom,
      dateTo,
      interval,
      sort,
      limit,
      offset,
    } as GetHistoricalOptions;
  }

  /** @todo stocks, indexes, coins options */
};

const intervalReg = /^\d{0,2}(hour)|(min)|(day)|(week)$/;

/**
 * isOptionsValidate
 * @param options API 요청에 사용될 options 객체
 * @returns 유효한 경우 true, 유효하지 않은 경우 false
 */
const isOptionsValidate = (options: GetHistoricalOptions): boolean => {
  const { type, ticker, exchange, dateFrom, dateTo, interval, sort, limit, offset } = options;
  if (!type.trim() || !ticker.trim()) return false;

  if (interval && !intervalReg.test(interval)) return false;
  if (limit && isNaN(Number(limit))) return false;
  if (offset && isNaN(Number(offset))) return false;

  /** @todo sort enum type checking?? */

  /** @todo stocks, indexes, coins options */
  return true;
};

/**
 * @description
 * Market data -> Client (using EventSource)
 */
@Controller({ path: marketHome })
export class MarketController {
  constructor() // @Inject(MarketService) private marketService: MarketService
  {
    /** @todo Yml 또는 Injection 있는 경우 */
  }

  /**
   * sendHistoricalData
   * @description
   * GET `market/hist?type=...` 요청 시
   *  => helper funcs; KRX,
   *  => MarketService getHistorical
   *  => MarketController sendHistoricalData, setInterval
   *  => client EventSource 사용해 15초 간격 주기적인 업데이트
   * - socket 대체
   * @param req
   * @param res
   */
  @GetMapping({ path: [marketSubpaths.historical] })
  public async sendHistoricalData(req: Request, res: Response) {
    try {
      const options = parseQueryToOptions(marketName.historical, req.query);

      if (!isOptionsValidate(options)) return res.sendStatus(404);

      /** SSE Response Instance 생성 */
      new SSE(res, options);

      const data = await MarketService.getHistorical(options);
      this.writeData(data, res);

      /** 15초 간격 SSE, @todo 조정해도 계속 3초 간격 요청..? => debounce 처리해야.. */
      const intervalTime = times.sse * 3000;
      const eventSourceInterval = setInterval(async () => {
        const data = await MarketService.getHistorical(options);
        this.writeData(data, res);
      }, /** 15s */ intervalTime);

      /** 연결 끊어지는 경우 */
      res.end(() => clearInterval(eventSourceInterval));
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  }

  private async writeData(data, res) {
    res.write(`id: ${new Date()}\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }

  @GetMapping({ path: [marketSubpaths.stocks] })
  public async sendStocksList(req: Request, res: Response) {
    try {
      /** @todo 주식 리스트 데이터 전송 */
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  }

  @GetMapping({ path: [marketSubpaths.indexes] })
  public async sendIndexesList(req: Request, res: Response) {
    try {
      /** @todo 인덱스 리스트 데이터 전송 */
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  }

  @GetMapping({ path: [marketSubpaths.coins] })
  public async sendCoinsList(req: Request, res: Response) {
    try {
      /** @todo 코인 리스트 데이터 전송 */
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  }
}
