import { getSearchedItems } from '../../apis';

// 초기 state 값 설정
const state = () => ({
  searchedItems: [
    {
      itemName: '코스피 지수',
      itemTime: '14:14:14',
      itemCategory: '서울',
      itemPrice: '3,136.10',
      fluctuationPrice: '-1.32',
      fluctuationRate: '-0.42%',
    },
    {
      itemName: '코스피 지수',
      itemTime: '14:14:14',
      itemCategory: '서울',
      itemPrice: '3,136.10',
      fluctuationPrice: '-1.32',
      fluctuationRate: '-0.42%',
    },
    {
      itemName: '코스피 지수',
      itemTime: '14:14:14',
      itemCategory: '서울',
      itemPrice: '3,136.10',
      fluctuationPrice: '-1.32',
      fluctuationRate: '-0.42%',
    },
  ],

  searchedNews: [],
  searchedAnalysis: [],
});

// getter 설정

const getters = {
  // itemCollections: (state) => {
  //   return [state.stockItems, state.indexItems, state.cryptoItems];
  // },
};

// actions 설정
const actions = {
  async getSearchedItems({ commit }, keyword) {
    try {
      const result = await getSearchedItems({ keyword });
      const data = result.data.data;

      const items = data.map((element) => {
        return element;
      });

      if (items) {
        commit('changeSearchedItems', items);

        return true;
      }

      throw new Error('Getting searched items was failed in user store');
    } catch (error) {
      console.log(error);
    }
  },
};

// mutatuons 설정
const mutations = {
  changeSearchedItems(state, items) {
    state.searchedItems = items;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
