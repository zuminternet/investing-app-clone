<template>
  <List />
</template>

<script lang="ts">
import Vue from 'vue';
import List from '@/components/organisms/NewsList.vue';

export default Vue.extend({
  name: 'NewsIndex',

  components: { List },
});
</script>

<style lang="scss" scoped>
</style>