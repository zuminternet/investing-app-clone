<template>
  <main class="area">
    <!-- <Chart class="card" :typeName="`stock`" :ticker="239340" :smaConfigs="[{}]" :width="200" /> -->
    <!-- <Chart
      class="card"
      :typeName="`stock`"
      :ticker="`239340`"
      :smaConfigs="[
        {
          duration: 20,
          color: `red`,
          width: 10,
        },
      ]"
      :width="200"
    /> -->
    <Chart class="card" :typeName="`stock`" :apiType="`es`" :ticker="ticker" />
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

import Chart from '@/components/molecules/Chart.vue';
import ReplySection from '@/components/organisms/ReplySection.vue';

export default Vue.extend({
  components: {
    Chart,
    ReplySection,
  },

  props: {
    ticker: {
      type: String,
      default: '005930',
    },
  },
});
</script>
