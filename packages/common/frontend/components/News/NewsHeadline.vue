<template>
  <article>
    <slot></slot>
  </article>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'NewsHeadline',
});
</script>

<style lang="scss" scoped>
article {
  border-bottom: 1px solid gray;
  background-color: white;

  .news-img-container {
    width: 100%;
  }
  .news-text-container {
    padding: 12px;
  }
}
</style>
