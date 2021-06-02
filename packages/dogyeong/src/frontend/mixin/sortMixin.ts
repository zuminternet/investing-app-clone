export const sortMap = {
  desc: -1,
  asc: 1,
  none: 0,
} as const;

export default {
  data() {
    return {
      sortByValue: sortMap.none,
      sortByDiff: sortMap.none,
    };
  },

  computed: {
    sortedMarketData() {
      if (this.sortByValue === sortMap.asc || this.sortByValue === sortMap.desc) {
        return [...this.marketData].sort((a, b) => (a.value - b.value) * this.sortByValue);
      }
      if (this.sortByDiff === 1 || this.sortByDiff === -1) {
        return [...this.marketData].sort((a, b) => (a.diff - b.diff) * this.sortByDiff);
      }
      return this.marketData;
    },
  },

  methods: {
    changeSortByValue() {
      this.sortByDiff = sortMap.none;
      if (this.sortByValue === sortMap.none) return (this.sortByValue = sortMap.desc);
      if (this.sortByValue === sortMap.desc) return (this.sortByValue = sortMap.asc);
      this.sortByValue = sortMap.none;
    },

    changeSrotByDiff() {
      this.sortByValue = sortMap.none;
      if (this.sortByDiff === sortMap.none) return (this.sortByDiff = sortMap.desc);
      if (this.sortByDiff === sortMap.desc) return (this.sortByDiff = sortMap.asc);
      this.sortByDiff = sortMap.none;
    },
  },
};
