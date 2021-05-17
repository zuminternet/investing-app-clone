<template>
  <div>
    <h1>뉴스</h1>
    <BottomNav></BottomNav>
  </div>
</template>

<script>
import BottomNav from '@/components/BottomNav/BottomNav';

export default {
  name: 'News',

  components: { BottomNav },
};
</script>

<style lang="scss" scoped>
div {
  background-color: blue;
}
</style>
