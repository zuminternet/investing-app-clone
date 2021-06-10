<template>
  <span :class="{ 'button-active': buttonActive }">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'CustomText',
  props: {
    buttonActive: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.button-active {
  color: var(--active-button-color);
  font-weight: bold;
}
</style>
