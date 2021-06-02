import { Service } from 'zum-portal-core/backend/decorator/Alias';
import { marketStackConfig } from '../config';
import axios from 'axios';

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
  public async getItemDetail({ symbols }) {
    const { accessKey } = marketStackConfig;
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
