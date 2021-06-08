<template>
  <main class="area">
    <Chart class="card" :typeName="`stock`" />
    <!-- <Chart :typeName="`stock`" :timespan="`week`" :from="`2017-01-24`" /> -->
    <ReplySection :ticker="'sdfsdf'" />
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import Chart from '@/components/organisms/Chart';

import ReplySection from '../../../../../common/frontend/components/ReplySection';

export default Vue.extend({
  components: {
    Chart,
    ReplySection,
  },
});
</script>
