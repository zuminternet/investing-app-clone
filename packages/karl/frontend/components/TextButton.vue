<template>
  <button class="text-button" @click="$emit('handle-button-click')">
    {{message}}
  </button>
</template>

<script>
export default {
  name: "TextButton",
  props: ['message']
}
</script>

<style scoped lang="scss">
.text-button {
  width: fit-content;
  height: fit-content;
  background-color: aqua;
}
</style>