<template>
  <div class="area">
    <header class="area">
      <Title :title="'Markets'" />
      <Menu />
    </header>
    <main class="area">
      <keep-alive>
        <component :is="currentMarket"></component>
      </keep-alive>
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { marketsType } from '@/type/views';
import Title from '@/components/atoms/Title';
import Menu from '@/components/molecules/HeaderMenus';
import Footer from '@/components/organisms/Footer';
import Indexes from '@/views/Markets/Indexes';
import Stocks from '@/views/Markets/Stocks';
import Coins from '@/views/Markets/Coins';

export default Vue.extend({
  components: {
    Menu,
    Footer,
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
