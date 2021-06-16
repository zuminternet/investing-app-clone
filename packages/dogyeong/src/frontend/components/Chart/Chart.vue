<template>
  <div ref="chartContainer"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import { createChart } from '@/chart';

export default Vue.extend({
  name: 'Chart',
  props: {
    colorOption: {
      type: Object,
      default: undefined,
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      chartInstance: null,
    };
  },
  watch: {
    data(newData) {
      if (!this.chartInstance) return;
      this.chartInstance.setCandles([...newData]);
    },
  },
  mounted() {
    const $el = this.$refs.chartContainer;
    this.chartInstance = createChart($el, this.colorOption);
  },
  beforeDestroy() {},
});
</script>

<style lang="scss" module></style>
