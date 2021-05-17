<template>
  <div>
    <h1>Bookmark</h1>
    <BottomNav></BottomNav>
  </div>
</template>

<script>
import BottomNav from '@/components/BottomNav/BottomNav';

export default {
  name: 'Bookmark',

  components: { BottomNav },
};
</script>

<style lang="scss" scoped>
div {
  background-color: blue;
}
</style>
