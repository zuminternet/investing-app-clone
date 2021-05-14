<template>
  <router-link :to="href">{{ name }}</router-link>
</template>

<script>
export default {
  props: {
    name: String,
    href: String,
  },
};
</script>

<style lang="scss" scoped>
a {
  @extend .router-link;
  color: $blue-900;
}
</style>
