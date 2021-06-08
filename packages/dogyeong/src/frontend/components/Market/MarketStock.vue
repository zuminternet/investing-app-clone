<template>
  <div>
    <div v-if="isLoading">
      주식 불러오는중..
    </div>
    <div v-else-if="isError">
      Error!
    </div>
    <MarketList
      v-else
      :listData="sortedMarketData"
      :sortByValue="sortByValue"
      :sortByDiff="sortByDiff"
      @clickValueTab="changeSortByValue"
      @clickDiffTab="changeSrotByDiff"
    ></MarketList>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import MarketList from '@/components/Market/MarketList.vue';
import sortMixin from '@/mixin/sortMixin';

export default Vue.extend({
  name: 'MarketStock',

  components: { MarketList },

  mixins: [sortMixin],

  computed: {
    ...mapState({ marketData: ({ finance }) => finance.stocks.data }),
    ...mapState({ isLoading: ({ finance }) => finance.stocks.isLoading }),
    ...mapState({ isError: ({ finance }) => finance.stocks.isError }),
  },
});
</script>

<style></style>
