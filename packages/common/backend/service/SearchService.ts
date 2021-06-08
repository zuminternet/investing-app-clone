import { Service } from 'zum-portal-core/backend/decorator/Alias';
// import { Caching } from 'zum-portal-core/backend/decorator/Caching';
import axios from 'axios';

import { marketStackConfig } from '../config';
import { tickerMap } from '../../domain';
// import { times, isProductionMode } from '../../domain';

export interface getSearchedItemsInfo {
  keyword: string;
  email: string;
}

@Service()
export default class SearchService {
  constructor() {}

  /**
   *
   * @description 검색 기능 렌더링을 위한 데이터를 받아오는 service
   * @param keyword
   * @returns items
   */

  // @Caching({
  //   /** 개발모드에서는 1시간에 한 번만 실행 */
  //   refreshCron: isProductionMode ? `30 * * * * *` : `1 * * *`,
  //   /** 캐싱 기간 초 단위 */
  //   ttl: isProductionMode ? times.caching : times.caching * 60,
  //   runOnStart: false,
  //   unless: (result) => !result,
  // })
  public async getSearchedItems({ keyword }: getSearchedItemsInfo) {
    const { accessKey } = marketStackConfig;
    let { data: result } = await axios.get(`http://api.marketstack.com/v1/tickers?access_key=${accessKey}&search=${keyword}`);
    let { data: items } = result;
    const displayedItems = [];

    if (items) {
      for (let i = 0; i < items.length; i++) {
        items[i].name = undefined;
        const { symbol } = items[i];
        const { acronym } = items[i].stock_exchange;

        if (tickerMap.stock[symbol]) {
          items[i].name = tickerMap.stock[symbol].name;
          items[i].category = tickerMap.stock[symbol].category;
        }

        if (tickerMap.index[symbol]) {
          items[i].name = tickerMap.index[symbol].name;
          items[i].category = tickerMap.index[symbol].category;
        }

        if (tickerMap.crypto[symbol]) {
          items[i].name = tickerMap.crypto[symbol].name;
          items[i].category = tickerMap.crypto[symbol].category;
        }

        if (items[i].name && acronym === items[i].category) {
          displayedItems.push(items[i]);
        }
      }

      return displayedItems;
    }

    return false;
  }
}
