<template>
  <p>
    {{message}}
    {{children}}
  </p>
</template>

<script>
export default {
  name: "CustomText",
  props: ['message', 'children']
}
</script>

<style scoped>

</style>