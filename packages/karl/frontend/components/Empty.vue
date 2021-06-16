<template>
  <div v-if="emptyHeight" :style="style" class="empty-with-height">
    Empty!!
  </div>
  <div v-else class="empty">
    Empty!!
  </div>
</template>

<script>
export default {
  name: 'Empty',

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
</style>
