<template>
  <div v-if="emptyHeight" :style="style" class="empty-with-height">
    <div class="empty-icon-box">
      <span class="empty-icon">&#9785;</span>
      <custom-text>{{ emptyText }}</custom-text>
    </div>
  </div>
  <div v-else class="empty">
    <div class="empty-icon-box">
      <span class="empty-icon">&#9785;</span>
      <custom-text>{{ emptyText }}</custom-text>
    </div>
  </div>
</template>

<script>
import CustomText from 'common/frontend/components/CustomText.vue';

import { text } from 'common/frontend/constants';

export default {
  name: 'Empty',

  components: {
    CustomText,
  },

  props: {
    emptyHeight: {
      type: Number,
      default: null,
    },
  },

  computed: {
    style() {
      return {
        height: this.emptyHeight + 'px',
      };
    },
  },

  data() {
    return {
      emptyText: text.EMPTY,
    };
  },
};
</script>

<style scoped lang="scss">
.empty-with-height {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.empty {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.empty-icon-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.empty-icon {
  font-size: 80px;
  color: var(--blue-color);
}
</style>
