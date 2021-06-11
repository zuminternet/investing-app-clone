import { AxiosStatic } from 'axios';
import { apiEndpoints } from '@/config';

declare const Axios: AxiosStatic;

export const addBookmark = async ({ symbol, name, category }) => {
  const { data } = await Axios.post(apiEndpoints.addBookmark, {
    symbol,
    name,
    category,
  });
  return data;
};

export const removeBookmark = async ({ symbol, name }) => {
  const { data } = await Axios.delete(apiEndpoints.removeBookmark, {
    data: { symbol, name },
  });
  return data;
};

export const getBookmarks = async () => {
  const { data } = await Axios.get(apiEndpoints.getBookmarks);
  return data;
};
