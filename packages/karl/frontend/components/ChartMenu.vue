<template>
  <div class="chart-menu" :style="style">
    <button class="chart-menu-button" @click="$emit('handle-chart-menu-button-click', $event)" value="d">
      <custom-text v-if="period === 'd'" chartMenuActiveText>D</custom-text>
      <custom-text v-else>D</custom-text>
    </button>
    <button class="chart-menu-button" @click="$emit('handle-chart-menu-button-click', $event)" value="w">
      <custom-text v-if="period === 'w'" chartMenuActiveText>W</custom-text>
      <custom-text v-else>W</custom-text>
    </button>
    <button class="chart-menu-button" @click="$emit('handle-chart-menu-button-click', $event)" value="m">
      <custom-text v-if="period === 'm'" chartMenuActiveText>M</custom-text>
      <custom-text v-else>M</custom-text>
    </button>
    <button v-if="isCandle" class="chart-menu-button" @click="$emit('handle-chart-menu-button-click', $event)" value="Linear">
      Linear
    </button>
    <button v-if="!isCandle" class="chart-menu-button" @click="$emit('handle-chart-menu-button-click', $event)" value="Candle">
      Candle
    </button>
  </div>
</template>

<script>
import CustomText from 'common/frontend/components/CustomText.vue';

export default {
  components: { CustomText },
  name: 'ChartMenu',
  props: {
    canvasWidth: {
      type: Number,
      required: true,
    },

    canvasHeight: {
      type: Number,
      default: 20,
    },

    isCandle: {
      type: Boolean,
      required: true,
    },

    period: {
      type: String,
      required: true,
    },
  },

  computed: {
    style() {
      return {
        height: this.canvasHeight + 'px',
      };
    },
  },
};
</script>

<style>
.chart-menu {
  display: flex;
}

.chart-menu-button {
  flex: 1;
  border: 0;
}
</style>
