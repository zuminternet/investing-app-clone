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
import { mapGetters, mapActions } from 'vuex';
import { marketsType, viewsTitle } from '@/type/views';
import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';
import Indexes from '@/components/templates/Markets/Indexes';
import Stocks from '@/components/templates/Markets/Stocks';
import Coins from '@/components/templates/Markets/Coins';
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

  mounted() {
    this[RootActions.SET_CURRENT_TICKER](this.ticker);
    /** @todo console 삭제 */
    console.log({ vuexTicker: this.getTicker, ticker: this.ticker });
    console.assert(this.getTicker === this.ticker);
  },

  computed: {
    /** @todo 개발 마무리 단계에서 삭제 */
    ...mapGetters(['getTicker']),
  },

  methods: {
    ...mapActions([RootActions.SET_CURRENT_TICKER]),
  },
});
</script>
