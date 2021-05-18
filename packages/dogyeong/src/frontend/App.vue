<template>
  <div id="app" :class="{ dark: $store.state.isDarkTheme }">
    <div class="wrapper">
      <router-view></router-view>
    </div>
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

<style lang="scss" scoped>
#app {
  background-color: var(--app-bg-color);

  .wrapper {
    width: 100%;
    height: 100%;
    max-width: var(--app-width);
    margin: auto;
    background-color: var(--bg-color);
    position: relative;
  }
}
</style>
