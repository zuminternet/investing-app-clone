// 초기 state 값 설정
const state = () => ({
  stockItems: [{
    itemName: '코스피 지수',
    itemTime: '14:14:14',
    itemCategory: '서울',
    itemPrice: '3,136.10',
    fluctuationPrice: '-1.32',
    fluctuationRate: '-0.42%'
  }],
  indexItems: [{
    itemName: '코스피 주식',
    itemTime: '14:14:14',
    itemCategory: '서울',
    itemPrice: '3,136.10',
    fluctuationPrice: '-1.32',
    fluctuationRate: '-0.42%'
  }],
  cryptoItems: [{
    itemName: '코스피 가상화폐',
    itemTime: '14:14:14',
    itemCategory: '서울',
    itemPrice: '3,136.10',
    fluctuationPrice: '-1.32',
    fluctuationRate: '-0.42%'
  }],
  itemDetailInformation: {
    itemName: '코스피 상세페이지',
    itemTime: '14:14:14',
    itemCategory: '서울',
    itemPrice: '3,136.10',
    fluctuationPrice: '-1.32',
    fluctuationRate: '-0.42%'
  }
})


// getter 설정

const getters = {
  itemCollections: (state) => {
    return [state.stockItems, state.indexItems, state.cryptoItems]
  }
}

// actions 설정
const actions = {

}

// mutatuons 설정
const mutations = {

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}