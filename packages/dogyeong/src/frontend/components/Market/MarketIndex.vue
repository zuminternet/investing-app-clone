<template>
  <div>
    <div v-if="isLoading">
      지수 불러오는중..
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
  name: 'MarketIndex',

  components: { MarketList },

  mixins: [sortMixin],

  computed: {
    ...mapState({ marketData: ({ finance }) => finance.indices.data }),
    ...mapState({ isLoading: ({ finance }) => finance.indices.isLoading }),
    ...mapState({ isError: ({ finance }) => finance.indices.isError }),
  },
});
</script>
