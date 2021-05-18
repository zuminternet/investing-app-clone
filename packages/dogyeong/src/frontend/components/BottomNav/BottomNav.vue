<template>
  <nav>
    <router-link to="/">시장</router-link>
    <router-link to="/news">뉴스</router-link>
    <router-link to="/bookmark">관심목록</router-link>
    <router-link to="/setting">더보기</router-link>
  </nav>
</template>

<script>
export default {
  name: 'BottomNav',
};
</script>

<style lang="scss" scoped>
nav {
  position: fixed;
  bottom: 0;
  background-color: var(--bg-color);
  width: 100%;
  max-width: var(--app-width);
  height: 48px;
  z-index: 1;
  border-top: 1px solid var(--border-color);
  display: flex;

  a {
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 48px;
  }
}
</style>
