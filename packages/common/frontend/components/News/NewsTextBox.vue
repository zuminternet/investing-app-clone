<template>
  <div class="news-text-container">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'NewsTextBox',
});
</script>
