<template>
  <router-link :to="href" class="router-link noselect">{{ name }}</router-link>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    name: {
      type: String,
      required: true,
    },
    href: {
      type: String,
    },
    isDark: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
.router-link {
  @extend .card;

  text-decoration: none;

  &:hover {
    background-color: $blue-100;
  }

  &-exact-active {
    font-weight: bold;
  }
}
</style>
