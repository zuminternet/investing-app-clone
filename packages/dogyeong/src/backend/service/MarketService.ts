import { Service } from 'zum-portal-core/backend/decorator/Alias';
import * as yahooFinance from 'yahoo-finance';
import { investing } from 'investing-com-api';

@Service()
export default class MarketService {
  constructor() {}

  public getIndices() {
    /** historical */
    // 기간동안의 캔들 데이터
    // return yahooFinance.historical({
    //   symbol: 'AAPL',
    //   from: '2012-01-01',
    //   to: '2012-12-31',
    // });
    /** quote */
    // "price"
    // 현재가격에 대한 자세한 정보
    // 가격변동, 가격변동(퍼센트) ...
    // return yahooFinance.quote({
    //   symbol: 'TSLA',
    //   modules: ['price'],
    // });
    // "summaryProfile"
    // 회사정보(주소,위치,전화번호 등)
    // "summaryDetail"
    // 50일 평균, 200일 평균 등...

    return investing('currencies/eur-usd');
  }

  public getCoins() {}

  public getStocks() {}
}
