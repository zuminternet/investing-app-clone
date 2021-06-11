<template>
  <section id="market-list">
    <Card
      v-for="({ typeName, ticker, tickerName, from }, idx) in tickers"
      :key="ticker"
      v-bind="{ typeName, ticker, tickerName, from }"
    ></Card>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { createNamespacedHelpers } from 'vuex';
import Card from '@/components/molecules/MarketListCard.vue';
import { StoreNames } from '@/store';

const { mapActions } = createNamespacedHelpers(StoreNames.Market);

export default Vue.extend({
  name: 'MarketList',

  components: { Card },

  props: {
    tickers: {
      type: Array,
      required: true,
    },
  },

  // data: {
  //   marketData: [],
  // },

  // async mounted() {
  //   const data = await this.getTodayStocks();
  //   this.marketData = data;
  //   console.log(this.marketData[0]);
  // },

  // methods: {
  //   ...mapActions(['getTodayStocks']),
  // },
});
</script>

<style lang="scss" scoped>
#market-list {
  width: 100%;
}
</style>
