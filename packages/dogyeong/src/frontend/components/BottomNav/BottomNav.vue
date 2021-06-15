<template>
  <nav>
    <router-link to="/">시장</router-link>
    <router-link to="/news">뉴스</router-link>
    <router-link to="/bookmark">관심목록</router-link>
    <router-link to="/setting">더보기</router-link>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BottomNav',
});
</script>

<style lang="scss" scoped>
nav {
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
