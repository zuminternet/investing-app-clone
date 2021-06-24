import { AxiosStatic } from 'axios';
import { apiEndpoints } from '@/config';
import { SearchItem } from '../../backend/controller/SearchController';
import { ArticleDoc } from 'common/backend/model/ArticleModel';

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
  const { data } = await Axios.get<SearchItem[]>(apiEndpoints.searchItems, {
    params: { email, keyword },
  });
  return data;
};

export const searchNews = async ({ offset = 0, limit = 10, keyword }: ArticleSearchProps) => {
  const { data } = await Axios.get<ArticleDoc[]>(apiEndpoints.searchNews, {
    params: { offset, limit, keyword },
  });
  return data;
};

export const searchOpinions = async ({ offset = 0, limit = 10, keyword }: ArticleSearchProps) => {
  const { data } = await Axios.get<ArticleDoc[]>(apiEndpoints.searchOpinions, {
    params: { offset, limit, keyword },
  });
  return data;
};
