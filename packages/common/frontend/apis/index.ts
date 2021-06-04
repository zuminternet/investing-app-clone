import { AxiosStatic } from 'axios';

declare const Axios: AxiosStatic;

const devURL = 'http://localhost:3000';

export interface getSearchedItemsInfo {
  keyword: string;
  email: string;
}

export interface getItemDetailInfo {
  email: string;
  symbols: string;
}

export interface getNewsAndAnalysesInfo {
  offset: number;
  limit: number;
}

export interface createBookmarkInfo {
  email: string;
  symbol: string;
  name: string;
  category: string;
}

export interface deleteBookmarkInfo {
  email: string;
  symbol: string;
  name: string;
  category: string;
}

/**
 * @description search page에 렌더링할 searched items를 가져오는 front-side API 호출 함수
 * @param param0
 * @returns Promise
 */
const getSearchedItems = async ({ keyword, email }: getSearchedItemsInfo) => {
  try {
    const result = await Axios.get(`${devURL}/api/search/items?keyword=${keyword}&email=${email}`);

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
 * @returns Promise
 */
const getItemDetail = async ({ symbols, email }: getItemDetailInfo) => {
  try {
    console.log(email);
    const result = await Axios.get(`${devURL}/api/item-detail?symbols=${symbols}&email=${email}`);
    console.log(result);

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
 * @returns Promise
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
 * @returns Promise
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
 * @returns Promise
 */
const createBookmark = async ({ email, symbol, name, category }: createBookmarkInfo) => {
  try {
    const result = await Axios.post(`${devURL}/api/bookmark`, {
      email,
      symbol,
      name,
      category,
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

const deleteBookmark = async ({ email, symbol, name, category }: deleteBookmarkInfo) => {
  try {
    const result = await Axios.delete(`${devURL}/api/bookmark`, {
      data: { email, symbol, name, category },
    });

    if (result.status === 200) {
      return true;
    }

    return false;
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description email을 받아 bookmarks를 가져오는 front-side API call 함수
 * @param email
 * @returns Promise
 */

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

export { getSearchedItems, getItemDetail, getNews, getAnalyses, createBookmark, getBookmarks, deleteBookmark };
