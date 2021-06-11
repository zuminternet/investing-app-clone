<template>
  <section id="market-list">
    <Card
      v-for="{ typeName, ticker, tickerName, from } in tickers"
      :key="ticker"
      v-bind="{ typeName, ticker, tickerName, from }"
    />
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { createNamespacedHelpers } from 'vuex';
import Card from '@/components/molecules/MarketListCard.vue';
import Link from '@/components/atoms/RouterLink.vue';
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
});
</script>

<style lang="scss" scoped>
#market-list {
  width: 100%;
}
</style>
