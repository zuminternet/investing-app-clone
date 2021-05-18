<template>
  <div>
    <h1>Markets</h1>
    <keep-alive>
      <component :is="currentMarketComponent"></component>
    </keep-alive>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { markets } from '@/type/views';
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
    currentMarketComponent(): markets {
      return this.$route.params.detail;
    },
  },
});
</script>

<style lang="scss" scoped>
//
</style>
