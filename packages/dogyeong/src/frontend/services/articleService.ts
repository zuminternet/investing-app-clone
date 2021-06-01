import { AxiosStatic } from 'axios';
import { apiEndpoints } from '@/config';

declare const Axios: AxiosStatic;

export const getNews = async () => {
  const { data } = await Axios.get(apiEndpoints.getNews);
  return data;
};

export const getOpinions = async () => {
  const { data } = await Axios.get(apiEndpoints.getOpinions);
  return data;
};
