<template>
  <main class="area section">
    <Words :contents="'MAIN SECTION'"></Words>
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import Words from '@/components/atoms/Words';

export default Vue.extend({
  components: { Words },
});
</script>
