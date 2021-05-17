<template>
  <div id="app">
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
<style>
  body {
    margin: 0;
    background-color: greenyellow;

  }
  #app {
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 0;
    top: 0;
    width: 100%;
  }

</style>
