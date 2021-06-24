export const sortMap = {
  desc: -1,
  asc: 1,
  none: 0,
} as const;

/**
 * sortMixin
 *
 * MarketCoin, MarketIndex, MarketStock 컴포넌트에서
 * 공통적으로 사용하는 정렬기능을 추출한 믹스인
 */
export default {
  data() {
    return {
      sortByValue: sortMap.none,
      sortByDiff: sortMap.none,
    };
  },

  computed: {
    shouldSortByValue() {
      return this.sortByValue === sortMap.asc || this.sortByValue === sortMap.desc;
    },

    shouldSortByDiff() {
      return this.sortByDiff === sortMap.asc || this.sortByDiff === sortMap.desc;
    },

    // 종목들의 데이터를 정렬해서 반환
    sortedMarketData() {
      if (this.shouldSortByValue) {
        return [...this.marketData].sort((a, b) => (a.close - b.close) * this.sortByValue);
      }
      if (this.shouldSortByDiff) {
        return [...this.marketData].sort((a, b) => (a.diff - b.diff) * this.sortByDiff);
      }
      return this.marketData;
    },
  },

  methods: {
    // 현재가 정렬
    changeSortByValue() {
      this.sortByDiff = sortMap.none;
      if (this.sortByValue === sortMap.none) return (this.sortByValue = sortMap.desc);
      if (this.sortByValue === sortMap.desc) return (this.sortByValue = sortMap.asc);
      this.sortByValue = sortMap.none;
    },

    // 전일대비 정렬
    changeSrotByDiff() {
      this.sortByValue = sortMap.none;
      if (this.sortByDiff === sortMap.none) return (this.sortByDiff = sortMap.desc);
      if (this.sortByDiff === sortMap.desc) return (this.sortByDiff = sortMap.asc);
      this.sortByDiff = sortMap.none;
    },
  },
};
