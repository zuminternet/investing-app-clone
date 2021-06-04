import { Service } from 'zum-portal-core/backend/decorator/Alias';
import { Caching } from 'zum-portal-core/backend/decorator/Caching';
import axios from 'axios';

import { marketStackConfig } from '../config';
import { times, isProductionMode } from '../../domain';

export interface getSearchedItemsInfo {
  keyword: string;
}

@Service()
export default class ItemDetailService {
  constructor() {}

  /**
   * @description item detail page에 렌더링할 종목 상세정보를 가져오는 service
   * @param param0
   * @returns
   */

  @Caching({
    /** 개발모드에서는 1시간에 한 번만 실행 */
    refreshCron: isProductionMode ? `30 * * * * *` : `1 * * *`,
    /** 캐싱 기간 초 단위 */
    ttl: isProductionMode ? times.caching : times.caching * 60,
    runOnStart: false,
    unless: (result) => !result,
  })
  public async getItemDetail({ symbols }) {
    const { accessKey } = marketStackConfig;
    console.log('call');
    const { data: itemDetailSubInfo1 } = await axios.get(
      `http://api.marketstack.com/v1/eod?access_key=${accessKey}&symbols=${symbols}&limit=1`,
    );

    const { data: itemDetailSubInfo2 } = await axios.get(
      `http://api.marketstack.com/v1/tickers?access_key=${accessKey}&search=${symbols}&limit=1`,
    );

    const itemDetailInfo = { ...itemDetailSubInfo1.data[0], ...itemDetailSubInfo2.data[0] };

    if (itemDetailInfo) {
      return itemDetailInfo;
    }

    throw new Error('Getting item detail info was failed in ItemDetailService');
  }
}
