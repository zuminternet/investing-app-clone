<template>
  <div>
    <HeaderBar>관심목록</HeaderBar>
    <BottomNav></BottomNav>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar/HeaderBar';
import BottomNav from '@/components/BottomNav/BottomNav';

export default {
  name: 'Bookmark',

  components: { HeaderBar, BottomNav },
};
</script>

<style lang="scss" scoped>
div {
  background-color: blue;
}
</style>
