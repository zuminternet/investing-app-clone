<template>
  <footer class="card noselect">
    <FooterText />
  </footer>
</template>

<script lang="ts">
import Vue from 'vue';
import FooterText from '@/components/molecules/FooterText';

export default Vue.extend({
  components: { FooterText },
});
</script>
