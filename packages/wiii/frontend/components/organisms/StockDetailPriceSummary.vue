<template>
  <section id="stocks-detail-header-summary" class="noselect">
    <Words class="stocks-detail-header-price"> 시가총액: {{ marketCapitalization }}</Words>
    <Words class="stocks-detail-header-price up"> 52주 최고가: {{ week52High }} 원</Words>
    <Words class="stocks-detail-header-price down"> 52주 최저가: {{ week52Low }} 원</Words>
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

  .stocks-detail-header-price {
    font-size: 0.75rem;

    &.up {
      color: $red-a400;
    }

    &.down {
      color: $blue-500;
    }
  }
}
</style>
