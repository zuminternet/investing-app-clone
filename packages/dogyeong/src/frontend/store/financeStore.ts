import * as financeService from '@/services/financeService';

/**
 * financeStore
 *
 * 시장 탭에서 사용하는 주식/가상화폐/지수 데이터를 관리하는 모듈
 */
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
          const { isLoading, data } = state.indices;

          if (isLoading) return;
          if (!data.length) commit('setIndicesLoading');

          const indices = await financeService.getIndices();

          commit('setIndices', indices);
        } catch (e) {
          commit('setIndicesError');
          console.error(e);
        }
      },
      async getCoins({ state, commit }) {
        try {
          const { isLoading, data } = state.coins;

          if (isLoading) return;
          if (!data.length) commit('setCoinsLoading');

          const coins = await financeService.getCoins();

          commit('setCoins', coins);
        } catch (e) {
          commit('setCoinsError');
          console.error(e);
        }
      },
      async getStocks({ state, commit }) {
        try {
          const { isLoading, data } = state.stocks;

          if (isLoading) return;
          if (!data.length) commit('setStocksLoading');

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
