import { Module } from 'vuex';
import { AxiosStatic } from 'axios';
import { RootState } from '@/store';

import { getMarketNews, getCompanyNews } from '@/services/news';
import { marketEnum } from '../../../domain/newsData';

declare const Axios: AxiosStatic;

interface NewsData {
  id: number;
  category: string;
  headline: string;
  summarty: string;
  datetime: number;
  image: string;
  source: string;
  url: string;
}

interface CachingMarketNews {
  [category: string]: any[];
}

interface NewsState {
  cachedMarketNews: CachingMarketNews;
  currentModalNews: NewsData;
}

const News = {
  namespaced: true,
  state: {
    cachedMarketNews: {
      [marketEnum.general]: [],
      [marketEnum.crypto]: [],
    },
    currentModalNews: undefined,
  },

  getters: {},

  mutations: {
    cacheMarketNews: (state, { category, data }) => {
      state.cachedMarketNews[category] = data;
    },
    setModalNews: (state, payload: NewsData) => {
      state.currentModalNews = payload;
    },
  },

  actions: {
    getMarketNewsAction: async ({ commit }, category: marketEnum) => {
      if (!category) return;
      try {
        const results = await getMarketNews(category);
        commit('cacheMarketNews', { category, data: results });

        console.log({ results });
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

    setModalNewsAction({ commit }, payload: NewsData) {
      commit('setModalNews', payload);
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
