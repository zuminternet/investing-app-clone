<template>
  <Chart :typeName="`stock`" />
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
