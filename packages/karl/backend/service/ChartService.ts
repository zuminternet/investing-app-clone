import { Service } from 'zum-portal-core/backend/decorator/Alias';
import * as yahooFinance from 'yahoo-finance';

export interface getHistoricalDataInfo {
  symbol: string;
  from: string;
  to: string;
  period: string;
}

@Service()
export default class ChartService {
  constructor() {}

  public async getHistoricalData({ symbol, from, to, period }: getHistoricalDataInfo) {
    const data = await yahooFinance.historical({
      symbol,
      from,
      to,
      period,
    });

    if (data) {
      return data;
    }

    return false;
  }
}
