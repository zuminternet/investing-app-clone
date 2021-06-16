<template>
  <router-link :to="href" class="router-link noselect">{{ name }} <slot /></router-link>
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

<style lang="scss" scoped></style>
