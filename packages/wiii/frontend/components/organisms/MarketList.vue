<template>
  <section id="market-list">
    <Card v-for="{ typeName, ticker, tickerName } in tickers" :key="ticker" v-bind="{ typeName, ticker, tickerName }" />
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Card from '@/components/molecules/MarketListCard.vue';
import Button from '../atoms/Button.vue';

export default Vue.extend({
  name: 'MarketList',

  components: { Card, Button },

  props: {
    tickers: {
      type: Array,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
#market-list {
  width: 100%;
}
</style>
