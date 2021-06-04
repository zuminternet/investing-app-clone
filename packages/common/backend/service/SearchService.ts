import { Service } from 'zum-portal-core/backend/decorator/Alias';
import { Caching } from 'zum-portal-core/backend/decorator/Caching';
import axios from 'axios';

import { marketStackConfig } from '../config';
import { times, isProductionMode } from '../../domain';

export interface getSearchedItemsInfo {
  keyword: string;
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

  @Caching({
    /** 개발모드에서는 1시간에 한 번만 실행 */
    refreshCron: isProductionMode ? `30 * * * * *` : `1 * * *`,
    /** 캐싱 기간 초 단위 */
    ttl: isProductionMode ? times.caching : times.caching * 60,
    runOnStart: false,
    unless: (result) => !result,
  })
  public async getSearchedItems({ keyword }: getSearchedItemsInfo) {
    const { accessKey } = marketStackConfig;
    let { data: items } = await axios.get(`http://api.marketstack.com/v1/tickers?access_key=${accessKey}&search=${keyword}`);

    if (items) {
      // items = items.map((item) => {
      //   return {};
      // });

      return items;
    }

    throw new Error('getting searched items was failed in SearchService');
  }
}
