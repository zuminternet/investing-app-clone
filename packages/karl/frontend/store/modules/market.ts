import { getStocks } from '../../apis';

// 초기 state 값 설정
const state = () => ({
  indexItems: [
    {
      itemName: '코스피 주식',
      itemTime: '14:14:14',
      itemCategory: '서울',
      itemPrice: '3,136.10',
      itemCurrency: 'KRW',
      fluctuationPrice: '-1.32',
      fluctuationRate: '-0.42%',
    },
  ],
  stockItems: [],

  cryptoItems: [
    {
      itemName: '코스피 가상화폐',
      itemTime: '14:14:14',
      itemCategory: '서울',
      itemPrice: '3,136.10',
      itemCurrency: 'KRW',
      fluctuationPrice: '-1.32',
      fluctuationRate: '-0.42%',
    },
  ],
  itemDetailInformations: {
    itemName: '코스피 상세페이지',
    itemTime: '14:14:14',
    itemCategory: '서울',
    itemPrice: '3,136.10',
    itemCurrency: 'KRW',
    fluctuationPrice: '-1.32',
    fluctuationRate: '-0.42%',
    itemOverallInformations: {
      daysRange: ['일일 변동폭', '79,100 - 79,700'],
      fiftyTwoRange: ['52주 가격변동폭', '1111'],
      marketCap: ['총 시가', '1111'],
      bidAndAsk: ['매수가/매도가', '1111'],
      volume: ['거래량', '1111'],
      averageVolume: ['평균 거래량', '1111'],
      previousClose: ['이전종가', '1111'],
      open: ['시가', '1111'],
      priceEarningRatio: ['주가수익비율', '1111'],
      eps: ['주당 순이익', '1111'],
    },
  },
});

// getter 설정

const getters = {
  itemCollections: (state) => {
    return [state.indexItems, state.stockItems, state.cryptoItems];
  },
};

// actions 설정
const actions = {
  async getStocks({ commit }) {
    try {
      const result = await getStocks();
      const data = result.data.data;

      const stocks = data.map((stock) => {
        return stock;
      });

      if (stocks) {
        commit('changeStockItems', stocks);

        return true;
      }

      throw new Error('Getting stocks was failed in market store');
    } catch (error) {
      console.log(error);
    }
  },
};

// mutatuons 설정
const mutations = {
  changeStockItems(state, stocks) {
    state.stockItems = stocks;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
