<template>
  <div class="area">
    <Header :titleText="titleText" />
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
import { marketsType, viewsTitle } from '@/type/views';
import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';
import Indexes from '@/components/templates/Markets/Indexes';
import Stocks from '@/components/templates/Markets/Stocks';
import Coins from '@/components/templates/Markets/Coins';

export default Vue.extend({
  name: 'MarketsView',

  components: {
    Header,
    Footer,
    Indexes,
    Stocks,
    Coins,
  },

  data() {
    return {
      titleText: viewsTitle.Markets,
    };
  },

  computed: {
    currentMarket(): marketsType {
      return this.$route.params.detail;
    },
  },
});
</script>
