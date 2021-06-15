<template>
  <div class="area market-sort">
    <Words class="market-sort-text noselect">정렬: </Words>
    <Button id="market-sort-button" @click.native="sortTickers"> {{ sortText }} </Button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import Words from '@/components/atoms/Words.vue';
import Button from '@/components/atoms/Button.vue';

const sortFuncs = [
  (arr) => arr.sort(({ change: a }, { change: b }) => b - a),
  (arr) => arr.sort(({ change: a }, { change: b }) => a - b),
  (arr) => arr.sort(({ price: a }, { price: b }) => b - a),
  (arr) => arr.sort(({ price: a }, { price: b }) => a - b),
  (arr) => arr.sort(({ tickerName: a }, { tickerName: b }) => (a > b ? -1 : b > a ? 1 : 0)),
  (arr) => arr.sort(({ tickerName: a }, { tickerName: b }) => (a > b ? 1 : b > a ? -1 : 0)),
];

export default Vue.extend({
  components: { Words, Button },

  props: {
    tickers: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      sortTexts: ['등락율순 ⬇️', '등락율순 ⬆️', '가격순 ⬇️', '가격순 ⬆️', '가나다순 ⬇️', '가나다순 ⬆️'],
      sortIdx: 0,
    };
  },

  computed: {
    sortText() {
      return this.sortTexts[this.sortIdx];
    },
  },

  methods: {
    sortTickers() {
      const {
        sortIdx,
        sortTexts: { length },
        tickers,
      } = this;

      this.sortIdx = (sortIdx + 1) % length;
      this.tickers = sortFuncs[this.sortIdx](tickers);
    },
  },
});
</script>

<style lang="scss" scoped>
.market-sort {
  display: flex;
  justify-content: flex-end;
  align-items: baseline;

  &-text {
    width: max-content;
    padding-right: 15px;
  }
}

#market-sort-button {
  width: 120px;
  &:hover {
    text-decoration: none;
    background-color: rgba($red-800, 0.3);
  }
}
</style>
