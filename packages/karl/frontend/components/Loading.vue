<template>
  <div v-if="loadingHeight" :style="style" class="loading-with-height">
    <half-circle-spinner :animation-duration="1000" :size="spinnerSize" color="#1e90ff" />
  </div>
  <div v-else class="loading">
    <half-circle-spinner :animation-duration="1000" :size="spinnerSize" color="#1e90ff" />
  </div>
</template>

<script>
import { HalfCircleSpinner } from 'epic-spinners';

export default {
  name: 'Loading',

  components: {
    HalfCircleSpinner,
  },

  props: {
    loadingHeight: {
      type: Number,
      default: null,
    },

    spinnerSize: {
      type: Number,
      default: 60,
    },
  },

  computed: {
    style() {
      return {
        height: this.loadingHeight + 'px',
      };
    },
  },
};
</script>

<style scoped lang="scss">
.loading-with-height {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.loading {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
