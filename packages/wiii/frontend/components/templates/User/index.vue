<template>
  <section>
    <h1>{{ getEmail }}님 화성 갈끄니까~~🚀🚀🚀</h1>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  data() {
    return {};
  },

  computed: {
    ...mapGetters(['getEmail']),
  },
});
</script>

<style lang="scss" scoped></style>
