<template>
  <div>
    <HeaderBar>
      뉴스
    </HeaderBar>
    <BottomNav></BottomNav>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HeaderBar from '@/components/HeaderBar/HeaderBar.vue';
import BottomNav from '@/components/BottomNav/BottomNav.vue';

export default Vue.extend({
  name: 'News',
  components: { BottomNav, HeaderBar },
});
</script>

<style lang="scss" scoped>
div {
  background-color: blue;
}
</style>
