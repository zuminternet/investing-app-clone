import { AxiosStatic } from 'axios';
import { ReplyDoc } from '../../backend/model/ReplyModel';

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
  tickers: String[];
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
  const result = await Axios.get(`${devURL}/api/search/items?keyword=${keyword}&email=${email}`);

  if (result.status === 200) {
    const { data: searchedItems } = result;

    return searchedItems;
  }

  throw new Error('Getting searched items was failed in front api');
};

/**
 * @description item detail page에 렌더링할 item detail를 가져오는 front-side API 호출 함수
 * @param param0
 * @returns Promise
 */
const getItemDetail = async ({ symbols, email }: getItemDetailInfo) => {
  const result = await Axios.get(`${devURL}/api/item-detail`, {
    params: {
      symbols,
      email,
    },
  });

  if (result.status === 200) {
    const { data: itemDetail } = result;

    return itemDetail;
  }

  throw new Error('Getting item detail was failed in front api');
};

/**
 * @description item detail page에 렌더링할 news들을 가져오는 front-side API 호출 함수 현재 item detail용 service가 없어서 대체 사용중
 * @param param0
 * @returns Promise
 */
const getNews = async ({ offset = 0, limit = 10, tickers = [] }: getNewsAndAnalysesInfo) => {
  const result = await Axios.get(`${devURL}/api/articles/news`, {
    params: { offset, limit, tickers },
  });

  if (result.status === 200) {
    const { data: news } = result;

    return news;
  }

  throw new Error('Getting news was failed in front api');
};

/**
 * @description item detail page에 렌더링할 analyses를 가져오는 front-side API 호출 함수
 * @param param0
 * @returns Promise
 */

const getAnalyses = async ({ offset, limit, tickers }: getNewsAndAnalysesInfo) => {
  const result = await Axios.get(`${devURL}/api/articles/analyses`, {
    params: { offset, limit, tickers },
  });

  if (result.status === 200) {
    const { data: analyses } = result;

    return analyses;
  }

  throw new Error('Getting analyses was failed in front api');
};

const getArticleById = async (id: string) => {
  const result = await Axios.get(`${devURL}/api/article/${id}`);

  if (result.status === 200) {
    const { data } = result;

    return data;
  }

  throw new Error('Getting article was failed in front api');
};

/**
 * @description email, symbol을 받아 북마크 추가를 요청하는 front-side API call 함수
 * @param param0
 * @returns Promise
 */
const createBookmark = async ({ email, symbol, name, category }: createBookmarkInfo) => {
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
};

const deleteBookmark = async ({ email, symbol, name, category }: deleteBookmarkInfo) => {
  const result = await Axios.delete(`${devURL}/api/bookmark`, {
    data: { email, symbol, name, category },
  });

  if (result.status === 200) {
    return true;
  }

  throw new Error('Deleting bookmark was failed in front api');
};

/**
 * @description email을 받아 bookmarks를 가져오는 front-side API call 함수
 * @param email
 * @returns Promise
 */

const getBookmarks = async (email: string) => {
  const result = await Axios.get(`${devURL}/api/bookmark`, {
    params: {
      email,
    },
  });

  if (result.status === 200) {
    let { data: bookmarks } = result;

    return bookmarks;
  }
  throw new Error('Getting bookmarks was failed in front api');
};

/**
 * 댓글 추가 API
 * email, 종목 또는 뉴스 Id 가져오는 방법은 개발자 특성에 따라 구현
 */
export interface CreateReplyProps {
  email: string;
  docId: string;
  contents: string;
}

export const createReply = async ({ email, docId, contents }: CreateReplyProps) => {
  try {
    const { status, statusText } = await Axios.post(`/api/reply`, { docId, email, contents });
    if (status >= 400) throw Error(statusText);
    return true;
  } catch (e) {
    return console.error(e);
  }
};

interface IReply {
  replId: string;
  userThumbnail: string;
  userName: string;
  email: string;
  contents: string;
  updatedAt: Date;
  likes: number;
  isParent?: boolean;
  parentReplyId?: string;
}

const refiner = (repls: ReplyDoc[]): IReply[] =>
  repls.map(({ id, userThumbnail, picture, name, userName, email, contents, updatedAt, likes }) => ({
    replId: id,
    userThumbnail: picture || userThumbnail,
    userName: name || userName,
    email,
    contents,
    updatedAt: new Date(updatedAt),
    likes,
  }));

export const getReplsByDocID = async (docId: string, email: string) => {
  try {
    const {
      data: { results },
      status,
      statusText,
    } = await Axios.get(`/api/reply/${docId}?auth=${email}`);

    if (status >= 400) throw Error(statusText);

    return refiner(results);
  } catch (e) {
    return console.error(e);
  }
};

export { getSearchedItems, getItemDetail, getNews, getAnalyses, createBookmark, getBookmarks, deleteBookmark };
