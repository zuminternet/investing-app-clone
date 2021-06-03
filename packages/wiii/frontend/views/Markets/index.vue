<template>
  <div class="area">
    <header class="area">
      <Menu />
      <Title :title="'Markets'" />
    </header>
    <main class="area">
      <keep-alive>
        <component :is="currentMarket"></component>
      </keep-alive>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { marketsType } from '@/type/views';
import Menu from '@/components/molecules/HeaderMenus';
import Title from '@/components/atoms/Title';
import Indexes from '@/views/Markets/Indexes';
import Stocks from '@/views/Markets/Stocks';
import Coins from '@/views/Markets/Coins';

export default Vue.extend({
  components: {
    Menu,
    Title,
    Indexes,
    Stocks,
    Coins,
  },

  computed: {
    currentMarket(): marketsType {
      return this.$route.params.detail;
    },
  },
});
</script>
