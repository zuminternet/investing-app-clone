<template>
  <div class="card market-list-card">
    <Words>{{ tickerName }}</Words>
    <Chart v-bind="{ typeName, ticker, from, width, query, apiType }" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Words from '@/components/atoms/Words.vue';
import Chart from '@/components/organisms/Chart.vue';

export default Vue.extend({
  name: 'MarketListCard',

  components: { Words, Chart },

  data() {
    return {
      width: 150,
      query: {
        limit: 15,
      },
      smaConfigs: [],
      apiType: `static`,
    };
  },

  props: {
    typeName: String,
    ticker: String,
    tickerName: String,
    from: String,
  },

  mounted() {
    const { typeName, ticker, tickerName, from, data } = this;
    console.log({ typeName, ticker, tickerName, from, data });
  },
});
</script>

<style lang="scss" scoped>
.market-list-card {
  width: 100%;
}
</style>
