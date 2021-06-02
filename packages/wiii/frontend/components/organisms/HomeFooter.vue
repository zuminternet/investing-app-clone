<template>
  <footer class="area" :class="isDark">
    <h3 class="card" :class="isDark">Footer</h3>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  computed: {
    isDark() {
      return `dark`;
    },
  },
});
</script>
