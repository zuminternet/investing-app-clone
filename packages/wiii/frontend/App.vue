<template>
  <div id="app" class="area">
    <router-view />
  </div>
</template>

<script>
/*
 **********************************************************
 *
 *    줌 프론트엔드 신규입사자 파일럿 프로젝트 엔트리 컴포넌트
 *
 **********************************************************
 */
export default {
  name: 'App',
};
</script>

<style lang="scss">
html {
  @extend .center;

  background-color: $grey-100;

  body {
    @extend .area;

    font-family: -apple-system, 'Helvetica Neue', 'Noto Sans KR', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
</style>
