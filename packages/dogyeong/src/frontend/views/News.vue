<template>
  <div>
    <HeaderBar>
      뉴스
    </HeaderBar>
    <BottomNav></BottomNav>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar/HeaderBar';
import BottomNav from '@/components/BottomNav/BottomNav';

export default {
  name: 'News',
  components: { BottomNav, HeaderBar },
};
</script>

<style lang="scss" scoped>
div {
  background-color: blue;
}
</style>
