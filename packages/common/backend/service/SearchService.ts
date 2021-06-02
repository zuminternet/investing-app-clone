import { Service } from 'zum-portal-core/backend/decorator/Alias';
import { marketStackConfig } from '../config';
import axios from 'axios';

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
