<template>
  <div class="area">
    <h1>Markets</h1>
    <keep-alive>
      <component :is="currentMarketComponent"></component>
    </keep-alive>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { marketsType } from '@/type/views';
import Indexes from './Indexes';
import Stocks from './Stocks';
import Coins from './Coins';

export default Vue.extend({
  components: {
    Indexes,
    Stocks,
    Coins,
  },

  computed: {
    currentMarketComponent(): marketsType {
      return this.$route.params.detail;
    },
  },
});
</script>
