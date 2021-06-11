<template>
  <footer class="card noselect">
    <FooterText />
  </footer>
</template>

<script lang="ts">
import Vue from 'vue';
import FooterText from '@/components/molecules/FooterText.vue';

export default Vue.extend({
  components: { FooterText },
});
</script>

<style lang="scss" scoped>
footer.card {
  margin-top: 30px;
}
</style>
