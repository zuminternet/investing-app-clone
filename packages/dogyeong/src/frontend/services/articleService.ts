import { AxiosStatic } from 'axios';
import { apiEndpoints } from '@/config';

declare const Axios: AxiosStatic;

interface Query {
  offset?: number;
  limit?: number;
}

export const getArticle = async (id: string) => {
  const { data } = await Axios.get(`${apiEndpoints.getArticle}/${id}`);
  return data;
};

export const getNewNews = async ({ offset = 0, limit = 5 }: Query = {}) => {
  const { data } = await Axios.get(apiEndpoints.getNewNews, {
    params: { offset, limit },
  });
  return data;
};

export const getNewOpinions = async ({ offset = 0, limit = 5 }: Query = {}) => {
  const { data } = await Axios.get(apiEndpoints.getNewOpinions, {
    params: { offset, limit },
  });
  return data;
};

export const getPopularNews = async ({ offset = 0, limit = 5 }: Query = {}) => {
  const { data } = await Axios.get(apiEndpoints.getPopularNews, {
    params: { offset, limit },
  });
  return data;
};

export const getPopularOpinions = async ({ offset = 0, limit = 5 }: Query = {}) => {
  const { data } = await Axios.get(apiEndpoints.getPopularOpinions, {
    params: { offset, limit },
  });
  return data;
};
