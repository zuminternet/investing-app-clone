<template>
  <div>
    <BottomNav></BottomNav>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import BottomNav from '@/components/BottomNav/BottomNav.vue';

export default Vue.extend({
  name: 'News',
  components: { BottomNav },
});
</script>

<style lang="scss" scoped>
div {
  background-color: blue;
}
</style>
