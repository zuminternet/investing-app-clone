<template>
  <section id="stocks-detail-header-summary" class="noselect">
    <Words class="mini"> 시가총액: {{ marketCapitalization }}원</Words>
    <Words class="mini"> 52주 최고가: {{ week52High }}원</Words>
    <Words class="mini"> 52주 최저가: {{ week52Low }}</Words>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Words from '@/components/atoms/Words.vue';

export default Vue.extend({
  name: 'StockDetailPriceSummary',

  components: { Words },

  props: {
    marketCapitalization: {
      type: String,
    },
    week52High: {
      type: String,
    },
    week52Low: {
      type: String,
    },
  },
});
</script>

<style lang="scss" scoped>
#stocks-detail-header-summary {
  display: flex;
  justify-content: space-around;
}
</style>
