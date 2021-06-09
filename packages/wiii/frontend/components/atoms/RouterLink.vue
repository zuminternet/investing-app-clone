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
  },
});
</script>

<style lang="scss" scoped>
.router-link {
  @extend .card;

  line-height: 1.2rem;
  text-decoration: none;

  &:hover {
    color: $grey-100;
    background-color: $blue-700;
    font-weight: bold;
    font-style: oblique;
    text-decoration: $blue-300 underline 3px;
  }

  &-exact-active {
    color: $blue-700;
    font-weight: bold;
  }
}
</style>
