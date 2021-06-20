import { Module } from 'vuex';
import { AxiosStatic } from 'axios';
import { RootState } from '@/store';

import { getMarketNews, getCompanyNews } from '@/services/news';
import { marketEnum } from '../../../domain/newsData';

declare const Axios: AxiosStatic;

interface CachingMarketNews {
  [category: string]: any[];
}

interface NewsState {
  cachedMarketNews: CachingMarketNews;
}

const News = {
  namespaced: true,
  state: {
    cachedMarketNews: {
      [marketEnum.general]: [],
      [marketEnum.crypto]: [],
    },
  },
  getters: {},
  mutations: {
    cacheMarketNews: (state, { category, data }) => {
      state.cachedMarketNews[category] = data;
    },
  },
  actions: {
    getMarketNewsAction: async ({ commit }, category: marketEnum) => {
      if (!category) return;
      try {
        const results = await getMarketNews(category);
        commit('cacheMarketNews', { category, data: results });

        if (!results) return [];
        return results;
      } catch (e) {
        return console.error(e);
      }
    },

    getCompanyNewsAction: async (_, { symbol, from, to }) => {
      if (!symbol) return;
      try {
        const results = await getCompanyNews(symbol, from, to);
        console.log({ results });
        if (!results) return [];
        return results;
      } catch (e) {
        return console.error(e);
      }
    },

    /** 북마크 */
    // toggleBookmarkAction: (_, newsId: string) => {
    //   if (!newsId) return false;
    //   try {
    //     toggleBookmark(newsId);
    //   } catch (e) {
    //     return console.error(e);
    //   }
    // },
  } /** actions */,
} as Module<NewsState, RootState>;

export default News;
