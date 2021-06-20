import { Service } from 'zum-portal-core/backend/decorator/Alias';
// import { Caching } from 'zum-portal-core/backend/decorator/Caching';
import axios from 'axios';

import { marketStackConfig } from '../config';
import { tickerMap, nameMap, getMatchedItems } from '../../domain';
// import { times, isProductionMode } from '../../domain';

export interface getSearchedItemsInfo {
  keyword: string;
  email?: string;
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
    const matchtedItems = getMatchedItems(keyword);

    console.log(matchtedItems);

    if (matchtedItems.length) {
      return matchtedItems.map((item) => {
        let symbol, name, category;

        if (tickerMap.stock[item]) {
          ({ name, category } = tickerMap.stock[item]);

          return {
            name,
            category,
            symbol: item,
            isStock: true,
          };
        }

        if (nameMap.index[item]) {
          ({ symbol, category } = nameMap.index[item]);

          return {
            name: item,
            category,
            symbol,
            isStock: false,
          };
        }

        if (nameMap.crypto[item]) {
          ({ symbol, category } = nameMap.crypto[item]);

          return {
            name: item,
            category,
            symbol,
            isStock: false,
          };
        }
      });
    }

    return [];
  }
}
