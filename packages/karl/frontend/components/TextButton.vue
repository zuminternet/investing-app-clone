<template>
  <button class="text-button" @click="$emit('handle-button-click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'TextButton',
  props: [],
};
</script>

<style scoped lang="scss">
.text-button {
  width: fit-content;
  height: fit-content;
  border: 0;
}
</style>
