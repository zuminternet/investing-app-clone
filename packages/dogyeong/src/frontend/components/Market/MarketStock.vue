<template>
  <div>
    <div v-if="isLoading">
      주식 불러오는중..
    </div>
    <div v-else-if="isError">
      Error!
    </div>
    <MarketList v-else :list-data="stocks"></MarketList>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import MarketList from '@/components/MarketList/MarketList.vue';

export default Vue.extend({
  name: 'MarketStock',

  components: { MarketList },

  computed: {
    ...mapState({ stocks: ({ finance }) => finance.stocks.data }),
    ...mapState({ isLoading: ({ finance }) => finance.stocks.isLoading }),
    ...mapState({ isError: ({ finance }) => finance.stocks.isError }),
  },
});
</script>

<style></style>
