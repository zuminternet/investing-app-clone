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
  public async getItemDetailInfo({ symbols }) {
    try {
      const { accessKey } = marketStackConfig;
      const itemDetailInfo = await (
        await axios.get(`http://api.marketstack.com/v1/eod?access_key=${accessKey}&symbols=${symbols}`)
      ).data;

      if (itemDetailInfo) {
        return itemDetailInfo;
      }

      throw new Error('Getting item detail info was failed in ItemDetailService');
    } catch (error) {
      console.log(error);
    }
  }
}
