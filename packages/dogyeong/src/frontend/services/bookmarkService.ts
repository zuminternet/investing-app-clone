import { AxiosStatic } from 'axios';
import { apiEndpoints } from '@/config';
import { BookmarkDocument } from 'common/backend/model/BookmarkModel';

declare const Axios: AxiosStatic;

export const addBookmark = async ({ symbol, name, category }) => {
  const { data } = await Axios.post<BookmarkDocument>(apiEndpoints.addBookmark, {
    symbol,
    name,
    category,
  });
  return data;
};

export const removeBookmark = async ({ symbol, name }) => {
  const { data } = await Axios.delete<string>(apiEndpoints.removeBookmark, {
    data: { symbol, name },
  });
  return data;
};

export const getBookmarks = async () => {
  const { data } = await Axios.get<BookmarkDocument[]>(apiEndpoints.getBookmarks);
  return data;
};
