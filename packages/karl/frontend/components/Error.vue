<template>
  <div v-if="errorHeight" :style="style" class="error-with-height">
    Error!!
  </div>

  <div v-else class="error">
    Error!!
  </div>
</template>

<script>
export default {
  name: 'Error',

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
</style>
