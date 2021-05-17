<template>
  <header>
    <slot></slot>
  </header>
</template>

<script>
export default {
  name: 'HeaderBar',
};
</script>

<style lang="scss" scoped>
header {
  background-color: var(--header-bg-color);
  width: 100%;
  height: 48px;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--app-bg-color);
}
</style>
