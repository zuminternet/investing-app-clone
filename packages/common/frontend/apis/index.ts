import { AxiosStatic } from 'axios';

declare const Axios: AxiosStatic;

const devURL = 'http://localhost:3000';

export interface getSearchedItemsInfo {
  keyword: string;
}

export interface getItemDetailInfo {
  symbols: string;
}

export interface getNewsAndAnalysesInfo {
  offset: number;
  limit: number;
}

// export interface createBookmarkInfo {
//   email:
// }

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

/**
 * @description item detail page에 렌더링할 item detail를 가져오는 front-side API 호출 함수
 * @param param0
 * @returns
 */
const getItemDetail = async ({ symbols }: getItemDetailInfo) => {
  try {
    const itemDetail = (await Axios.get(`${devURL}/api/item-detail?symbols=${symbols}`)).data;

    if (itemDetail) {
      return itemDetail;
    }

    throw new Error('Getting item detail was failed in front api');
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description item detail page에 렌더링할 news들을 가져오는 front-side API 호출 함수 현재 item detail용 service가 없어서 대체 사용중
 * @param param0
 * @returns
 */
const getNews = async ({ offset, limit }: getNewsAndAnalysesInfo) => {
  try {
    const news = (await Axios.get(`${devURL}/api/articles/news?offset=${offset}&limit=${limit}`)).data;

    if (news) {
      return news;
    }

    throw new Error('Getting news was failed in front api');
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description item detail page에 렌더링할 analyses를 가져오는 front-side API 호출 함수
 * @param param0
 * @returns
 */

const getAnalyses = async ({ offset, limit }: getNewsAndAnalysesInfo) => {
  try {
    const analyses = await (await Axios.get(`${devURL}/api/articles/analyses?offset=${offset}&limit=${limit}`)).data;

    if (analyses) {
      return analyses;
    }

    throw new Error('Getting analyses was failed in front api');
  } catch (error) {
    console.log(error);
  }
};

const createBookmark = async () => {};

export { getSearchedItems, getItemDetail, getNews, getAnalyses };
