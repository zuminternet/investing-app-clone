import { AxiosStatic } from 'axios';
import { apiEndpoints } from '@/config';

declare const Axios: AxiosStatic;

interface ItemSearchProps {
  keyword: string;
  email?: string;
}

interface ArticleSearchProps {
  keyword: string;
  offset?: number;
  limit?: number;
}

export const searchItems = async ({ email, keyword }: ItemSearchProps) => {
  const { data } = await Axios.get(apiEndpoints.searchItems, {
    params: { email, keyword },
  });
  return data;
};

export const searchNews = async ({ offset = 0, limit = 10, keyword }: ArticleSearchProps) => {
  const { data } = await Axios.get(apiEndpoints.searchNews, {
    params: { offset, limit, keyword },
  });
  return data;
};

export const searchOpinions = async ({ offset = 0, limit = 10, keyword }: ArticleSearchProps) => {
  const { data } = await Axios.get(apiEndpoints.searchOpinions, {
    params: { offset, limit, keyword },
  });
  return data;
};
