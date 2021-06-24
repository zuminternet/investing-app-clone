<template>
  <div>
    <div v-if="isError">
      Error!
    </div>
    <template v-else>
      <LoadingSpinner v-if="isLoading" />
      <MarketList
        :listData="sortedMarketData"
        :sortByValue="sortByValue"
        :sortByDiff="sortByDiff"
        @clickValueTab="changeSortByValue"
        @clickDiffTab="changeSrotByDiff"
      />
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import MarketList from '@/components/Market/MarketList.vue';
import sortMixin from '@/mixin/sortMixin';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner.vue';

export default Vue.extend({
  name: 'MarketStock',

  components: { MarketList, LoadingSpinner },

  mixins: [sortMixin],

  computed: {
    ...mapState({ marketData: ({ finance }) => finance.stocks.data }),
    ...mapState({ isLoading: ({ finance }) => finance.stocks.isLoading }),
    ...mapState({ isError: ({ finance }) => finance.stocks.isError }),
  },
});
</script>

<style></style>
