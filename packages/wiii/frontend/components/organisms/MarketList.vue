<template>
  <section id="market-list" :class="{ loading: !hasTickers }">
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

  computed: {
    hasTickers() {
      return this.tickers.length;
    },
  },
});
</script>

<style lang="scss" scoped>
#market-list {
  width: 95%;
  padding: 10px;
  margin: 15px 0;
  min-height: 300px;

  border-radius: $border-radius-10;
  box-shadow: 0 0 5px 0 $grey-500;
}
</style>
