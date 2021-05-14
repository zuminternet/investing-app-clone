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
  background-color: skyblue;
  width: 100%;
  height: 40px;
  z-index: 1;
}
</style>
