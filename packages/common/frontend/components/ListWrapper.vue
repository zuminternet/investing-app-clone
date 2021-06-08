<template>
  <div class="list-wrapper" :style="style">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ListWrapper',
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
.list-wrapper {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.list-wrapper::-webkit-scrollbar {
  display: none;
}
</style>
