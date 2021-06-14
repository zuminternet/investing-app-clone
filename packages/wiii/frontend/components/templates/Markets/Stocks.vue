<template>
  <main class="area section">
    <MarketList :tickers="stockTickers" />
    <!-- 주식 관련 뉴스 리스트 -->
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import { createNamespacedHelpers } from 'vuex';

import MarketList from '@/components/organisms/MarketList.vue';
import { StoreNames } from '@/store';

const { mapState } = createNamespacedHelpers(StoreNames.Market);

export default Vue.extend({
  components: { MarketList },

  computed: {
    ...mapState(['stockTickers']),
  },
});
</script>
