import { AxiosStatic } from 'axios';
import { apiEndpoints } from '@/config';

declare const Axios: AxiosStatic;

interface Query {
  offset?: number;
  limit?: number;
}

export const getNews = async ({ offset = 0, limit = 10 }: Query = {}) => {
  const { data } = await Axios.get(apiEndpoints.getNews, {
    params: { offset, limit },
  });
  return data;
};

export const getOpinions = async ({ offset = 0, limit = 10 }: Query = {}) => {
  const { data } = await Axios.get(apiEndpoints.getOpinions, {
    params: { offset, limit },
  });
  return data;
};
