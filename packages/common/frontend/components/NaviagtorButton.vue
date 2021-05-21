<template>
  <button class="navigator-button">
    <slot></slot>
  </button>
</template>

<script>


export default {
  name: "NaviagtorButton",
}
</script>

<style scoped lang="scss">
  .navigator-button {
    display: flex;
    flex: 1 0 auto;
    align-items: center;
    justify-content: center;
  }

</style>