import * as articleService from '@/services/articleService';

export default () => {
  return {
    state: {
      new: {
        news: {
          data: [],
          isLoading: false,
          isError: false,
        },
        opinions: {
          data: [],
          isLoading: false,
          isError: false,
        },
      },
      popular: {
        news: {
          data: [],
          isLoading: false,
          isError: false,
        },
        opinions: {
          data: [],
          isLoading: false,
          isError: false,
        },
      },
    },

    mutations: {
      setNewNews(state, news = []) {
        state.new.news = {
          data: news,
          isLoading: false,
          isError: false,
        };
      },
      setNewNewsLoading({ new: { news } }) {
        news.isLoading = true;
        news.isError = false;
      },
      setNewNewsError({ new: { news } }) {
        news.isLoading = false;
        news.isError = true;
      },
      setNewOpinions(state, opinions = []) {
        state.new.opinions = {
          data: opinions,
          isLoading: false,
          isError: false,
        };
      },
      setNewOpinionsLoading({ new: { opinions } }) {
        opinions.isLoading = true;
        opinions.isError = false;
      },
      setNewOpinionsError({ new: { opinions } }) {
        opinions.isLoading = false;
        opinions.isError = true;
      },
      setPopularNews(state, news = []) {
        state.popular.news = {
          data: news,
          isLoading: false,
          isError: false,
        };
      },
      setPopularNewsLoading({ popular: { news } }) {
        news.isLoading = true;
        news.isError = false;
      },
      setPopularNewsError({ popular: { news } }) {
        news.isLoading = false;
        news.isError = true;
      },
      setPopularOpinions(state, opinions = []) {
        state.popular.opinions = {
          data: opinions,
          isLoading: false,
          isError: false,
        };
      },
      setPopularOpinionsLoading({ popular: { opinions } }) {
        opinions.isLoading = true;
        opinions.isError = false;
      },
      setPopularOpinionsError({ popular: { opinions } }) {
        opinions.isLoading = false;
        opinions.isError = true;
      },
    },

    actions: {
      async getNewNews({ state, commit }, reset = false) {
        try {
          const { news } = state.new;
          const offset = reset ? 0 : news.data.length;

          if (news.isLoading) return;

          commit('setNewNewsLoading');

          const newNews = await articleService.getNews({ offset });
          const nextState = reset ? newNews : [...news.data, ...newNews];

          commit('setNewNews', nextState);
        } catch (e) {
          commit('setNewNewsError');
          console.error(e);
        }
      },
      async getNewOpinions({ state, commit }, reset = false) {
        try {
          const { opinions } = state.new;
          const offset = reset ? 0 : opinions.data.length;

          if (opinions.isLoading) return;

          commit('setNewOpinionsLoading');

          const newOpinions = await articleService.getOpinions({ offset });
          const nextState = reset ? newOpinions : [...opinions.data, ...newOpinions];

          commit('setNewOpinions', nextState);
        } catch (e) {
          commit('setNewOpinionsError');
          console.error(e);
        }
      },
      async getPopularNews({ state, commit }, reset = false) {
        try {
          const { news } = state.popular;
          const offset = reset ? 0 : news.data.length;

          if (news.isLoading) return;

          commit('setPopularNewsLoading');

          const popularNews = await articleService.getNews({ offset });
          const nextState = reset ? popularNews : [...news.data, ...popularNews];

          commit('setPopularNews', nextState);
        } catch (e) {
          commit('setPopularNewsError');
          console.error(e);
        }
      },
      async getPopularOpinions({ state, commit }, reset = false) {
        try {
          const { opinions } = state.popular;
          const offset = reset ? 0 : opinions.data.length;

          if (opinions.isLoading) return;

          commit('setPopularOpinionsLoading');

          const popularOpinions = await articleService.getOpinions({ offset });
          const nextState = reset ? popularOpinions : [...opinions.data, ...popularOpinions];

          commit('setPopularOpinions', nextState);
        } catch (e) {
          commit('setPopularOpinionsError');
          console.error(e);
        }
      },
    },
  };
};
