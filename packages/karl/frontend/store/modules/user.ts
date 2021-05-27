import { getUser } from '../../apis';

// 초기 state 값 설정
const state = () => ({
  // stockItems: [
  //   {
  //     itemName: '코스피 지수',
  //     itemTime: '14:14:14',
  //     itemCategory: '서울',
  //     itemPrice: '3,136.10',
  //     fluctuationPrice: '-1.32',
  //     fluctuationRate: '-0.42%',
  //   },
  // ],
  // indexItems: [
  //   {
  //     itemName: '코스피 주식',
  //     itemTime: '14:14:14',
  //     itemCategory: '서울',
  //     itemPrice: '3,136.10',
  //     itemCurrency: 'KRW',
  //     fluctuationPrice: '-1.32',
  //     fluctuationRate: '-0.42%',
  //   },
  // ],
  // cryptoItems: [
  //   {
  //     itemName: '코스피 가상화폐',
  //     itemTime: '14:14:14',
  //     itemCategory: '서울',
  //     itemPrice: '3,136.10',
  //     itemCurrency: 'KRW',
  //     fluctuationPrice: '-1.32',
  //     fluctuationRate: '-0.42%',
  //   },
  // ],
  // itemDetailInformations: {
  //   itemName: '코스피 상세페이지',
  //   itemTime: '14:14:14',
  //   itemCategory: '서울',
  //   itemPrice: '3,136.10',
  //   itemCurrency: 'KRW',
  //   fluctuationPrice: '-1.32',
  //   fluctuationRate: '-0.42%',
  //   itemOverallInformations: {
  //     daysRange: ['일일 변동폭', '79,100 - 79,700'],
  //     fiftyTwoRange: ['52주 가격변동폭', '1111'],
  //     marketCap: ['총 시가', '1111'],
  //     bidAndAsk: ['매수가/매도가', '1111'],
  //     volume: ['거래량', '1111'],
  //     averageVolume: ['평균 거래량', '1111'],
  //     previousClose: ['이전종가', '1111'],
  //     open: ['시가', '1111'],
  //     priceEarningRatio: ['주가수익비율', '1111'],
  //     eps: ['주당 순이익', '1111'],
  //   },
  // },
  userName: '',
  userEmail: '',
  userFavorites: [],
});

// getter 설정

const getters = {
  itemCollections: (state) => {
    return [state.stockItems, state.indexItems, state.cryptoItems];
  },
};

// actions 설정
const actions = {
  async getUser({ commit }) {
    try {
      const user = await getUser();

      if (user) {
        return true;
      }

      throw new Error('Getting user was failed in user store');
    } catch (error) {
      console.log(error);
    }
  },
};

// mutatuons 설정
const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
