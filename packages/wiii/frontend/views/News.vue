<template>
  <div class="area">
    <Header :titleText="titleText" />
    <main class="area">
      <News />
      <Reply />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';

import Header from '@/components/organisms/Header.vue';
import News from '@/components/organisms/NewsSection.vue';
import Reply from '@/components/organisms/ReplySection.vue';
import Footer from '@/components/organisms/Footer.vue';
import { viewsTitle } from '@/type/views';
import { RootActions } from '@/store';

export default Vue.extend({
  name: 'NewsView',

  data() {
    return {
      titleText: viewsTitle.News,
    };
  },

  props: {
    /** router에서 받는 props */
    ticker: {
      type: [String, Number],
      default: '005930',
    },
  },

  components: {
    Header,
    News,
    Reply,
    Footer,
  },

  beforeMount() {
    this[RootActions.SET_CURRENT_TICKER](this.ticker);
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
