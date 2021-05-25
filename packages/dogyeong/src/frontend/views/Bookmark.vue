<template>
  <div>
    <HeaderBar>관심목록</HeaderBar>
    <BottomNav></BottomNav>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HeaderBar from '@/components/HeaderBar/HeaderBar.vue';
import BottomNav from '@/components/BottomNav/BottomNav.vue';

export default Vue.extend({
  name: 'Bookmark',

  components: { HeaderBar, BottomNav },
});
</script>

<style lang="scss" scoped>
div {
  background-color: blue;
}
</style>
