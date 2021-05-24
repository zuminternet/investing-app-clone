import * as financeService from '@/services/financeService';

export default () => {
  return {
    state: {
      indices: {
        data: null,
        isLoading: false,
        isError: false,
      },
      coins: {
        data: null,
        isLoading: false,
        isError: false,
      },
      stocks: {
        data: null,
        isLoading: false,
        isError: false,
      },
    },

    mutations: {
      setIndices(state, indices) {
        state.indices = {
          data: indices,
          isLoading: false,
          isError: false,
        };
      },
      setIndicesLoading(state) {
        state.indices = {
          ...state.indices,
          isLoading: true,
          isError: false,
        };
      },
      setIndicesError(state) {
        state.indices = {
          ...state.indices,
          isLoading: false,
          isError: true,
        };
      },
    },

    actions: {
      async getIndices({ state, commit }) {
        try {
          if (state.indices.isLoading) return;

          commit('setIndicesLoading');

          const indices = await financeService.getIndices();

          commit('setIndices', indices);
        } catch (e) {
          commit('setIndicesError');
          console.error(e);
        }
      },
    },
  };
};
