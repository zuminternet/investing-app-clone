import { Request, Response } from 'express';
import { Controller, GetMapping } from 'zum-portal-core/backend/decorator/Controller';

import SSE from './SSE';
import { GetHistoricalOptions } from '../../domain/apiOptions';
import { marketHome, marketName, marketSubpaths } from '../../domain/apiUrls';
import { MarketService } from '../service/Market.service';
import { getDateString, MINUTE_ONE, times, WEEK_ONE } from '../../domain/date';
import { Inject } from 'zum-portal-core/backend/decorator/Alias';
import { ApiError } from '../utils/error/api';

/**
 * parseQueryToOptions
 * @param path 타입 구분을 위한 경로; historical | stocks | indexes | coins
 * @param param req.param 객체
 * @returns API 요청에 필요한 options 객체
 */
const parseQueryToOptions = (path: marketName, param): GetHistoricalOptions => {
  /** /hist */
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
  constructor(@Inject(MarketService) private marketService: MarketService) {}

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
      /** @todo 굳이 class로? 그냥 함수로 선언해도 될 듯.. */
      new SSE(res, options);

      const data = await this.marketService.getCachedHistorical(options);
      this.writeData(data, res);

      /** @todo setInterval 하지 않아도, 브라우저에서 2-3초 간격 요청 보냄..? */
      // const intervalTime = times.sse * 3000;
      // const eventSourceInterval = setInterval(async () => {
      //   const data = await this.marketService.getHistorical(options);
      //   this.writeData(data, res);
      // }, /** 15s */ intervalTime);

      /** 연결 끊어지는 경우 */
      res.end(() => {
        // clearInterval(eventSourceInterval);
        console.log(`SSE Ended`);
      });
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  }

  private async writeData(data, res) {
    res.write(`id: ${new Date()}\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }

  /** @todo 주식 리스트 데이터 전송 */
  @GetMapping({ path: ['/stocks'] })
  public async sendStocksList({ query }: Request, res: Response) {
    const stockListError = () => new ApiError(`Send Stocks List`, this.sendStocksList.name);
    const dateFrom = getDateString(new Date().getTime() - WEEK_ONE * 2);
    try {
      const { stocks } = query;

      const tickers = stocks.split(`-`) as string[];
      console.log({ tickers });
      const data = [];
      for await (const ticker of tickers) {
        const options = parseQueryToOptions(marketName.historical, { type: `stock`, ticker, dateFrom });
        if (!isOptionsValidate(options)) return res.sendStatus(404);

        const d = await this.marketService.getCachedHistorical({ type: `stock`, ticker, dateFrom });
        data.push({ [ticker]: d });
      }

      res.send(data);
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
