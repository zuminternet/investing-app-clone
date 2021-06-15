<template>
  <nav :class="$style.nav">
    <RouterLink to="/">시장</RouterLink>
    <RouterLink to="/news">뉴스</RouterLink>
    <RouterLink to="/bookmark">관심목록</RouterLink>
    <RouterLink to="/setting">더보기</RouterLink>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BottomNav',
});
</script>

<style lang="scss" module>
.nav {
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

    &.RouterLink-exact-active,
    &:hover {
      font-weight: 600;
      color: var(--text-color);
    }
  }
}
</style>
