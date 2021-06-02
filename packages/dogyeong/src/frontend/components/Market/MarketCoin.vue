<template>
  <div>
    <div v-if="isLoading">
      가상화폐 불러오는중..
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
  name: 'MarketCoin',

  components: { MarketList },

  mixins: [sortMixin],

  computed: {
    ...mapState({ marketData: ({ finance }) => finance.coins.data }),
    ...mapState({ isLoading: ({ finance }) => finance.coins.isLoading }),
    ...mapState({ isError: ({ finance }) => finance.coins.isError }),
  },
});
</script>
