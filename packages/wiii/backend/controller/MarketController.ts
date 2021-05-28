/**
 * @description
 * Market data -> Client (using EventSource)
 */

import { Controller, GetMapping } from 'zum-portal-core/backend/decorator/Controller';
import { Request, Response } from 'express';
import { marketHome, markets } from 'domain/apiUrls';

@Controller({ path: marketHome })
export default class MarketController {
  constructor() /** @todo apiFacade */
  {}

  @GetMapping({ path: [markets.historical] })
  public async sendHistoricalData(req: Request, res: Response) {
    try {
      res.json(/** @todo */);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  }

  @GetMapping({ path: [markets.indexes] })
  public async sendIndexAggr(req: Request, res: Response) {
    try {
      /** @todo 개별 인덱스 데이터 전송 */
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  }

  @GetMapping({ path: [markets.coins] })
  public async sendCoinAggr(req: Request, res: Response) {
    try {
      /** @todo 개별 코인 데이터 전송 */
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  }

  @GetMapping({ path: [markets.stocks] })
  public async sendStocksList(req: Request, res: Response) {
    try {
      /** @todo 주식 리스트 데이터 전송 */
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  }

  @GetMapping({ path: [markets.indexes] })
  public async sendIndexesList(req: Request, res: Response) {
    try {
      /** @todo 인덱스 리스트 데이터 전송 */
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  }

  @GetMapping({ path: [markets.coins] })
  public async sendCoinsList(req: Request, res: Response) {
    try {
      /** @todo 코인 리스트 데이터 전송 */
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  }
}
