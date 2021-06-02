<template>
  <main class="area" :class="isDark">
    <h3 class="card" :class="isDark">MAIN SECTION</h3>
  </main>
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
