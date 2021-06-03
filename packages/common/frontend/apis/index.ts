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

export interface createBookmarkInfo {
  email: string;
  symbol: string;
}

/**
 * @description search page에 렌더링할 searched items를 가져오는 front-side API 호출 함수
 * @param param0
 * @returns
 */
const getSearchedItems = async ({ keyword }: getSearchedItemsInfo) => {
  try {
    const result = await Axios.get(`${devURL}/api/search/items?keyword=${keyword}`);

    if (result.status === 200) {
      const { data: searchedItems } = result;

      return searchedItems;
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
    const result = await Axios.get(`${devURL}/api/item-detail?symbols=${symbols}`);

    if (result.status === 200) {
      const { data: itemDetail } = result;

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
    const result = await Axios.get(`${devURL}/api/articles/news?offset=${offset}&limit=${limit}`);

    if (result.status === 200) {
      const { data: news } = result;

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
    const result = await Axios.get(`${devURL}/api/articles/analyses?offset=${offset}&limit=${limit}`);

    if (result.status === 200) {
      const { data: analyses } = result;

      return analyses;
    }

    throw new Error('Getting analyses was failed in front api');
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description email, symbol을 받아 북마크 추가를 요청하는 front-side API call 함수
 * @param param0
 * @returns
 */
const createBookmark = async ({ email, symbol }: createBookmarkInfo) => {
  try {
    const result = await Axios.post(`${devURL}/api/bookmark`, {
      email,
      symbol,
    });

    if (result.status === 201) {
      const { data: bookmark } = result;

      return bookmark;
    }

    throw new Error('Creating bookmark was failed in front api');
  } catch (error) {
    console.log(error);
  }
};

const getBookmarks = async (email: string) => {
  try {
    const result = await Axios.get(`${devURL}/api/bookmark?email=${email}`);

    if (result.status === 200) {
      const { data: bookmarks } = result;

      return bookmarks;
    }

    throw new Error('Getting bookmarks was failed in front api');
  } catch (error) {
    console.log(error);
  }
};

export { getSearchedItems, getItemDetail, getNews, getAnalyses, createBookmark, getBookmarks };
