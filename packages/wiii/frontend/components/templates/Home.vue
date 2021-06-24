<template>
  <main class="area section">
    <Words class="subtitle noselect">국내주식</Words>
    <MarketList :tickers="sortedStockData.slice(0, 5)" />
    <Words class="subtitle noselect">지수</Words>
    <MarketList :tickers="sortedIndexData.slice(0, 5)" />
    <Words class="subtitle noselect">가상화폐</Words>
    <MarketList :tickers="sortedCoinData.slice(0, 5)" />
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import Words from '@/components/atoms/Words.vue';
import MarketList from '@/components/organisms/MarketList.vue';
import { createNamespacedHelpers } from 'vuex';
import { StoreNames } from '@/store';

const { mapState } = createNamespacedHelpers(StoreNames.Market);

export default Vue.extend({
  components: { Words, MarketList },

  computed: {
    ...mapState(['sortedStockData', 'sortedCoinData', 'sortedIndexData']),
  },
});
</script>
