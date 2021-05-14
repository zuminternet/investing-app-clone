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
  background-color: darkblue;
  width: 100%;
  height: 48px;
  padding: 6px 12px;
  display: flex;
  align-items: center;
}
</style>
