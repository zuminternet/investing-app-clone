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
      async getNewNews({ state, commit }) {
        try {
          const { news } = state.new;

          if (news.isLoading) return;

          commit('setNewNewsLoading');

          const newNews = await articleService.getNews();

          commit('setNewNews', [...news.data, ...newNews]);
        } catch (e) {
          commit('setNewNewsError');
          console.error(e);
        }
      },
      async getNewOpinions({ state, commit }) {
        try {
          const { opinions } = state.new;

          if (opinions.isLoading) return;

          commit('setNewOpinionsLoading');

          const newOpinions = await articleService.getOpinions();

          commit('setNewOpinions', [...opinions.data, ...newOpinions]);
        } catch (e) {
          commit('setNewOpinionsError');
          console.error(e);
        }
      },
      async getPopularNews({ state, commit }) {
        try {
          const { news } = state.popular;

          if (news.isLoading) return;

          commit('setPopularNewsLoading');

          const popularNews = await articleService.getNews();

          commit('setPopularNews', [...news.data, ...popularNews]);
        } catch (e) {
          commit('setPopularNewsError');
          console.error(e);
        }
      },
      async getPopularOpinions({ state, commit }) {
        try {
          const { opinions } = state.popular;

          if (opinions.isLoading) return;

          commit('setPopularOpinionsLoading');

          const popularOpinions = await articleService.getOpinions();

          commit('setPopularOpinions', [...opinions.data, ...popularOpinions]);
        } catch (e) {
          commit('setPopularOpinionsError');
          console.error(e);
        }
      },
    },
  };
};
