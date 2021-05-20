<template>
  <span>
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: "CustomText",
  props: ['message', 'fontSize']
}
</script>

<style scoped lang="scss">

</style>