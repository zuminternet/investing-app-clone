<template>
  <div v-if="loadingHeight" :style="style" class="loading">
    Loading!!
  </div>
  <div v-else class="loading">
    Loading!!
  </div>
</template>

<script>
export default {
  name: 'Loading',

  props: {
    loadingHeight: {
      type: Number,
      default: null,
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
.loading {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
