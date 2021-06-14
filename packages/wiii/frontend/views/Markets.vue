<template>
  <div class="area">
    <Header :titleText="titleText" />
    <main class="area">
      <keep-alive>
        <component :is="type"></component>
      </keep-alive>
      <Reply />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { viewsTitle } from '@/type/views';
import Header from '@/components/organisms/Header.vue';
import Footer from '@/components/organisms/Footer.vue';
import Indexes from '@/components/templates/Markets/Indexes.vue';
import Stocks from '@/components/templates/Markets/Stocks.vue';
import Coins from '@/components/templates/Markets/Coins.vue';
import Reply from '@/components/organisms/ReplySection.vue';
import { RootActions } from '@/store';

export default Vue.extend({
  name: 'MarketsView',

  components: {
    Header,
    Footer,
    Indexes,
    Stocks,
    Coins,
    Reply,
  },

  data() {
    return {
      titleText: viewsTitle.Markets,
    };
  },

  props: {
    /** router에서 받는 props */
    type: {
      type: String,
      default: 'stocks',
    },
    ticker: {
      type: [String, Number],
      default: '005930',
    },
  },

  beforeMount() {
    this[RootActions.SET_CURRENT_TICKER](this.ticker);
    console.assert(this.getTicker === this.ticker);
  },

  methods: {
    ...mapActions([RootActions.SET_CURRENT_TICKER]),
  },
});
</script>
