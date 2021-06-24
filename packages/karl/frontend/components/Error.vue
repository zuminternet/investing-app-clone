<template>
  <div v-if="errorHeight" :style="style" class="error-with-height">
    <div class="error-icon-box">
      <span class="error-icon">&#9785;</span>
      <custom-text>{{ errorText }}</custom-text>
    </div>
  </div>

  <div v-else class="error">
    <div class="error-icon-box">
      <span class="error-icon">&#9785;</span>
      <custom-text>{{ errorText }}</custom-text>
    </div>
  </div>
</template>

<script>
import CustomText from 'common/frontend/components/CustomText.vue';

import { text } from 'common/frontend/constants';

export default {
  name: 'Error',

  components: {
    CustomText,
  },

  props: {
    errorHeight: {
      type: Number,
      default: null,
    },
  },

  computed: {
    style() {
      return {
        height: this.errorHeight + 'px',
      };
    },
  },

  data() {
    return {
      errorText: text.ERROR,
    };
  },
};
</script>

<style scoped lang="scss">
.error-with-height {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.error {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.error-icon {
  font-size: 80px;
  color: var(--blue-color);
}

.error-icon-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
