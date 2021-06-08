import * as financeService from '@/services/financeService';

export default () => {
  return {
    state: {
      indices: {
        data: [],
        isLoading: false,
        isError: false,
      },
      coins: {
        data: [],
        isLoading: false,
        isError: false,
      },
      stocks: {
        data: [],
        isLoading: false,
        isError: false,
      },
    },

    mutations: {
      setIndices(state, indices = []) {
        state.indices = {
          data: indices,
          isLoading: false,
          isError: false,
        };
      },
      setIndicesLoading({ indices }) {
        indices.isLoading = true;
        indices.isError = false;
      },
      setIndicesError({ indices }) {
        indices.isLoading = false;
        indices.isError = true;
      },
      setCoins(state, coins = []) {
        state.coins = {
          data: coins,
          isLoading: false,
          isError: false,
        };
      },
      setCoinsLoading({ coins }) {
        coins.isLoading = true;
        coins.isError = false;
      },
      setCoinsError({ coins }) {
        coins.isLoading = false;
        coins.isError = true;
      },
      setStocks(state, stocks = []) {
        state.stocks = {
          data: stocks,
          isLoading: false,
          isError: false,
        };
      },
      setStocksLoading({ stocks }) {
        stocks.isLoading = true;
        stocks.isError = false;
      },
      setStocksError({ stocks }) {
        stocks.isLoading = false;
        stocks.isError = true;
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
      async getCoins({ state, commit }) {
        try {
          if (state.coins.isLoading) return;

          commit('setCoinsLoading');

          const coins = await financeService.getCoins();

          commit('setCoins', coins);
        } catch (e) {
          commit('setCoinsError');
          console.error(e);
        }
      },
      async getStocks({ state, commit }) {
        try {
          if (state.stocks.isLoading) return;

          commit('setStocksLoading');

          const stocks = await financeService.getStocks();

          commit('setStocks', stocks);
        } catch (e) {
          commit('setStocksError');
          console.error(e);
        }
      },
    },
  };
};
