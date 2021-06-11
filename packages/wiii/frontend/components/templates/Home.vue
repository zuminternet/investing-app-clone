<template>
  <main class="area section">
    <Words class="subtitle">Stocks</Words>
    <MarketList :tickers="getStocksTickers" />
    <!-- <Words class="subtitle">Coins</Words> -->
    <!-- <MarketList :tickers="getCoinsTickers" /> -->
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import Words from '@/components/atoms/Words.vue';
import MarketList from '@/components/organisms/MarketList.vue';
import { createNamespacedHelpers } from 'vuex';
import { StoreNames } from '@/store';

const { mapGetters, mapActions } = createNamespacedHelpers(StoreNames.Market);

export default Vue.extend({
  components: { Words, MarketList },

  computed: {
    ...mapGetters(['getStocksTickers', 'getCoinsTickers']),
  },
});
</script>
