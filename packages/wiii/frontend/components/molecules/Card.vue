<template>
  <article class="card">
    <slot />
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import Words from '@/components/atoms/Words.vue';

export default Vue.extend({
  components: { Words },
});
</script>

<style lang="scss" scoped></style>
