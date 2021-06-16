<template>
  <nav class="bottom-nav">
    <RouterLink :to="routePaths.market">시장</RouterLink>
    <RouterLink :to="routePaths.news">뉴스</RouterLink>
    <RouterLink :to="routePaths.bookmark">관심목록</RouterLink>
    <RouterLink :to="routePaths.setting">더보기</RouterLink>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';
import { routePaths } from '@/config';

export default Vue.extend({
  name: 'BottomNav',

  data() {
    return {
      routePaths,
    };
  },
});
</script>

<style lang="scss" scoped>
.bottom-nav {
  background-color: var(--bg-color);
  width: 100%;
  max-width: var(--app-width);
  height: 48px;
  border-top: 1px solid var(--border-color);
  display: flex;

  a {
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 48px;
    color: var(--sub-text-color);
    font-weight: 500;

    &.router-link-exact-active,
    &:hover {
      font-weight: 600;
      color: var(--text-color);
    }
  }
}
</style>
