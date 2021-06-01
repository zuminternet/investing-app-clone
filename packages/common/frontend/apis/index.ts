import { AxiosStatic } from 'axios';

declare const Axios: AxiosStatic;

const devURL = 'http://localhost:3000';

export interface getSearchedItemsInfo {
  keyword: string;
}

export interface getItemDetailInfo {
  symbols: string;
}

/**
 * @description search page에 렌더링할 searched items를 가져오는 front-side API 호출 함수
 * @param param0
 * @returns
 */

const getSearchedItems = async ({ keyword }: getSearchedItemsInfo) => {
  try {
    const result = await Axios.get(`${devURL}/api/search/items?keyword=${keyword}`);

    if (result) {
      return result;
    }

    throw new Error('Getting searched items was failed in front api');
  } catch (error) {
    console.log(error);
  }
};

const getItemDetail = async ({ symbols }: getItemDetailInfo) => {
  try {
    const result = await Axios.get(`${devURL}/api/item-detail?symbols=${symbols}`);

    if (result) {
      return result;
    }

    throw new Error('Getting item detail was failed in front api');
  } catch (error) {
    console.log(error);
  }
};

export { getSearchedItems, getItemDetail };
