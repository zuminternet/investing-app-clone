<template>
  <div class="item-detail-wrapper" :style="style">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ItemDetailWrapper',
  props: {
    excludedHeight: {
      type: Number,
      default: 150,
    },
  },

  computed: {
    style() {
      return {
        height: `calc(100vh - ${this.excludedHeight}px)`,
      };
    },
  },
};
</script>

<style scoped lang="scss">
.item-detail-wrapper {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.item-detail-wrapper::-webkit-scrollbar {
  display: none;
}
</style>
