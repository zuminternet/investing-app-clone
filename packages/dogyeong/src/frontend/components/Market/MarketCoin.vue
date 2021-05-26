<template>
  <div>
    <div v-if="isLoading">
      가상화폐 불러오는중..
    </div>
    <div v-else-if="isError">
      Error!
    </div>
    <MarketList v-else :list-data="coins"></MarketList>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import MarketList from '@/components/MarketList/MarketList.vue';

export default Vue.extend({
  name: 'MarketCoin',

  components: { MarketList },

  computed: {
    ...mapState({ coins: ({ finance }) => finance.coins.data }),
    ...mapState({ isLoading: ({ finance }) => finance.coins.isLoading }),
    ...mapState({ isError: ({ finance }) => finance.coins.isError }),
  },
});
</script>

<style scoped>
h2 {
  background-color: aqua;
}
</style>
