<template>
  <main class="area section">
    <Button :tickers="sortedStockData" />
    <MarketList :tickers="sortedStockData" />
    <!-- 주식 관련 뉴스 리스트 -->
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import { createNamespacedHelpers } from 'vuex';

import Button from '@/components/molecules/MarketSortButton.vue';
import MarketList from '@/components/organisms/MarketList.vue';
import { StoreNames } from '@/store';

const { mapState } = createNamespacedHelpers(StoreNames.Market);

export default Vue.extend({
  components: { Button, MarketList },

  computed: {
    ...mapState(['sortedStockData']),
  },
});
</script>
