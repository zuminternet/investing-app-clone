<template>
  <div class="chart-menu" :style="style">
    <button :class="buttonClass" @click="$emit('handle-chart-menu-button-click', $event)" value="d">
      <custom-text v-if="period === 'd'" chartMenuActiveText>D</custom-text>
      <custom-text v-else>D</custom-text>
    </button>
    <button :class="buttonClass" @click="$emit('handle-chart-menu-button-click', $event)" value="w">
      <custom-text v-if="period === 'w'" chartMenuActiveText>W</custom-text>
      <custom-text v-else>W</custom-text>
    </button>
    <button :class="buttonClass" @click="$emit('handle-chart-menu-button-click', $event)" value="m">
      <custom-text v-if="period === 'm'" chartMenuActiveText>M</custom-text>
      <custom-text v-else>M</custom-text>
    </button>
    <button v-if="isCandle" :class="buttonClass" @click="$emit('handle-chart-menu-button-click', $event)" value="Linear">
      <custom-text>Linear</custom-text>
    </button>
    <button v-if="!isCandle" :class="buttonClass" @click="$emit('handle-chart-menu-button-click', $event)" value="Candle">
      <custom-text>Candle</custom-text>
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

    isDarkTheme: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    style() {
      return {
        height: this.canvasHeight + 'px',
      };
    },

    buttonClass() {
      return this.isDarkTheme ? 'chart-menu-button-dark' : 'chart-menu-button';
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

.chart-menu-button-dark {
  flex: 1;
  border: 0;
  background-color: var(--button-background-color);
}
</style>
