<template>
  <div class="area" :class="isDark">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',

  computed: {
    isDark() {
      /**
       * @todo
       * 다크 모드 토글
       */
      return 'dark';
    },
  },
};
</script>

<style lang="scss">
html {
  @extend .center;

  body {
    @extend .reset;

    /** @todo 다크모드 토글 */
    @extend .dark;

    max-width: $max-width-mobile;
    height: 100vh;
    background-color: $grey-100;

    font-family: -apple-system, 'Helvetica Neue', 'Noto Sans KR', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

.dark {
  background-color: $deep-dark;
  color: $sup-beige;
}
</style>
