import { getIndices, getStocks, getCryptos } from '../../apis';

enum nameMap {
  DOW_JONES_30 = 'Dow Jones 30',
  NASDAQ_100 = 'Nasdaq 100',
  NIKKEI_255 = 'Nikkei 255',
  BIT_COIN = 'Bit coin',
  LITE_COIN = 'Lite coin',
  ETHEREUM = 'Ethereum',
}

enum categoryMap {
  DOW_JONES_30 = 'NYSE',
  NASDAQ_100 = 'NASDAQ',
  NIKKEI_255 = 'Tokyo',
  CRYPTO = 'zum-investing-app',
}

// 초기 state 값 설정
const state = () => ({
  indicesItems: [],
  stockItems: [],
  cryptoItems: [],
});

// getter 설정

const getters = {
  itemCollections: (state) => {
    return [state.indicesItems, state.stockItems, state.cryptoItems];
  },
};

// actions 설정
const actions = {
  async getStocks({ commit }) {
    try {
      const stocks = await getStocks();

      if (stocks) {
        commit('setStockItems', stocks);

        return true;
      }

      throw new Error('Getting stocks was failed in market store');
    } catch (error) {
      console.log(error);
    }
  },

  async getIndices({ commit }) {
    try {
      const indices = await getIndices();

      if (indices) {
        commit('setIndicesItems', indices);

        return true;
      }
    } catch (error) {
      console.log(error);
    }
  },

  async getCryptos({ commit }) {
    try {
      const crpytos = await getCryptos();

      if (crpytos) {
        commit('setCryptoItems', crpytos);

        return true;
      }
    } catch (error) {
      console.log(error);
    }
  },
};

// mutatuons 설정
const mutations = {
  setStockItems(state, stocks) {
    state.stockItems = stocks;
  },

  setIndicesItems(state, indices) {
    const indicesItems = [];

    indices.forEach((index) => {
      const { key, value, diff, growthRate, date } = index;

      indicesItems.push({ key, name: nameMap[key], value, diff, growthRate, date, category: categoryMap[key], symbol: key });
    });

    state.indicesItems = indicesItems;
  },

  setCryptoItems(state, cryptos) {
    const cryptoItems = [];

    cryptos.forEach((crypto) => {
      const { key, value, diff, growthRate, date } = crypto;

      cryptoItems.push({
        key,
        name: nameMap[key],
        value,
        diff,
        growthRate,
        date,
        category: categoryMap['CRYPTO'],
        symbol: key,
      });
    });

    state.cryptoItems = cryptoItems;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
