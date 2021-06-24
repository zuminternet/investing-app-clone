<template>
  <div id="app" :class="{ dark: $store.state.isDarkTheme }">
    <router-view></router-view>
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

<style scoped lang="scss"></style>
