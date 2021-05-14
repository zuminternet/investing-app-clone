<template>
  <button class="text-button">
    {{message}}
  </button>
</template>

<script>
export default {
  name: "TextButton",
  props: ['message']
}
</script>

<style>
.text-button {
  width: fit-content;
  height: fit-content;
  background-color: aqua;
}
</style>