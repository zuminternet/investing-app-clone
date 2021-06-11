<template>
  <article class="card market-list-card">
    <div class="market-list-card-info">
      <Link class="market-list-card-link" :href="`/markets/${typeName}s/${ticker}`" :name="tickerName" />
    </div>
    <Chart v-bind="{ typeName, ticker }" />
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import Words from '@/components/atoms/Words.vue';
import Link from '@/components/atoms/RouterLink.vue';
import Chart from '@/components/molecules/ThumbnailChart.vue';

export default Vue.extend({
  name: 'MarketListCard',

  components: { Words, Link, Chart },

  props: {
    typeName: String,
    ticker: String,
    tickerName: String,
  },

  methods: {},

  mounted() {},
});
</script>

<style lang="scss" scoped>
.market-list-card {
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: $deep-blue;

  &-info {
    display: flex;
    flex-direction: column;
  }
}

.router-link {
  width: max-content;

  &:hover {
    background-color: rgba($red-800, 0.4);
  }
}
</style>
