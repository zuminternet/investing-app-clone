<template>
  <main class="area">
    <Chart class="card" :typeName="`stock`" />
    <!-- <Chart :typeName="`stock`" :timespan="`week`" :from="`2017-01-24`" /> -->
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import Chart from '@/components/organisms/Chart';

export default Vue.extend({
  components: {
    Chart,
  },
});
</script>
