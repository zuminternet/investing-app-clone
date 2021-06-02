<template>
  <div>
    <div v-if="isLoading">
      지수 불러오는중..
    </div>
    <div v-else-if="isError">
      Error!
    </div>
    <MarketList v-else :list-data="indices"></MarketList>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import MarketList from '@/components/MarketList/MarketList.vue';

export default Vue.extend({
  name: 'MarketIndex',

  components: { MarketList },

  computed: {
    ...mapState({ indices: ({ finance }) => finance.indices.data }),
    ...mapState({ isLoading: ({ finance }) => finance.indices.isLoading }),
    ...mapState({ isError: ({ finance }) => finance.indices.isError }),
  },
});
</script>
