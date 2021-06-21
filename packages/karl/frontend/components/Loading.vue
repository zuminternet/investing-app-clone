<template>
  <div v-if="loadingHeight" :style="style" class="loading-with-height">
    <hollow-dots-spinner v-if="isDotSpinner" :animation-duration="1000" :dot-size="spinnerSize" :dots-num="3" color="#1e90ff" />
    <half-circle-spinner v-else :animation-duration="1000" :size="spinnerSize" color="#1e90ff" />
  </div>
  <div v-else class="loading">
    <hollow-dots-spinner v-if="isDotSpinner" :animation-duration="1000" :dot-size="spinnerSize" :dots-num="3" color="#1e90ff" />
    <half-circle-spinner v-else :animation-duration="1000" :size="spinnerSize" color="#1e90ff" />
  </div>
</template>

<script>
import { HalfCircleSpinner, HollowDotsSpinner } from 'epic-spinners';

export default {
  name: 'Loading',

  components: {
    HalfCircleSpinner,
    HollowDotsSpinner,
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

    isDotSpinner: {
      type: Boolean,
      default: false,
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
