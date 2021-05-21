<template>
  <button v-if="buttonIndex !== slideActiveIndex" class="navigator-button" @click="$emit('set-slide-active-index', buttonIndex)">
    <slot></slot>
  </button>
  <button v-else class="navigator-button-active">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'NaviagtorButton',
  props: ['buttonIndex', 'slideActiveIndex'],
};
</script>

<style scoped lang="scss">
.navigator-button {
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  justify-content: center;
}

.navigator-button-active {
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  justify-content: center;
  background-color: green;
}
</style>
